package at.home.freezerlist.service;

import at.home.freezerlist.repository.DrawerRepository;
import at.home.freezerlist.repository.model.DrawerModel;
import at.home.freezerlist.rest.model.Drawer;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class DrawerServiceImpl implements DrawerService, ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DrawerServiceImpl.class);

    private static final String DRAWER_AMOUNT_PROPERTY = "app.config.drawerAmount";

    @Autowired
    private Environment environment;

    @Autowired
    private ConfigurableApplicationContext context;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DrawerRepository drawerRepository;

    @Override
    public List<Drawer> getDrawers() {
        return modelMapper.map(drawerRepository.findAll(), new TypeToken<List<Drawer>>() {
        }.getType());
    }

    @Override
    public Drawer getDrawer(Long id) {
        return modelMapper.map(drawerRepository.getReferenceById(id), new TypeToken<Drawer>() {
        }.getType());
    }

    @Override
    public void run(ApplicationArguments args) {
        if (environment.getProperty(DRAWER_AMOUNT_PROPERTY) == null) {
            log.error("run, property {} not set", DRAWER_AMOUNT_PROPERTY);
            System.exit(SpringApplication.exit(context));
        }
        int drawerAmount = Integer.parseInt(environment.getProperty(DRAWER_AMOUNT_PROPERTY));
        log.info("run, trying to create {} drawers for freezerItems", drawerAmount);
        if (drawerAmount < 1) {
            log.error("run, cannot create {} drawers, specify to a number larger or equal 1", drawerAmount);
            System.exit(SpringApplication.exit(context));
        }
        int drawerModelCount = ((int) drawerRepository.count());
        int diff = drawerAmount - drawerModelCount;
        log.info("run, diff is {}", diff);
        if (diff > 0) {
            int lastDrawerPhysicalOrder = 0;
            if (drawerModelCount != 0) {
                lastDrawerPhysicalOrder = drawerRepository.findAll().stream().max(Comparator.comparing(DrawerModel::getPhysicalOrder)).get().getPhysicalOrder();
                log.info("run, lastPhysicalOrder is {}", lastDrawerPhysicalOrder);
            }
            DrawerModel drawer = null;
            for (int i = lastDrawerPhysicalOrder + 1; i <= drawerAmount; i++) {
                drawer = new DrawerModel();
                drawer.setPhysicalOrder(i);
                drawer = drawerRepository.save(drawer);
                log.info("run, created drawer id {}, physical order {}", drawer.getId(), drawer.getPhysicalOrder());
            }
            log.info("run, created {} drawers for freezerItems", drawerAmount);
        } else if (diff < 0) {
            int lastDrawerPhysicalOrder = drawerRepository.findAll()
                    .stream()
                    .max(Comparator.comparing(DrawerModel::getPhysicalOrder))
                    .get()
                    .getPhysicalOrder();
            log.warn("run, lastPhysicalOrder is {}, need to delete {} drawers", lastDrawerPhysicalOrder, diff * -1);
            DrawerModel drawerModel;
            for (int i = lastDrawerPhysicalOrder; i > drawerModelCount + diff; i--) {
                drawerModel = drawerRepository.getByPhysicalOrder(i);
                log.warn("run, delete drawer {}", drawerModel.getId());
                drawerRepository.delete(drawerModel);
            }
        }
        log.info("run, drawer initialization finished");
    }
}

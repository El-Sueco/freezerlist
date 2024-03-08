package at.home.freezerlist.service;

import at.home.freezerlist.repository.FreezerItemRepository;
import at.home.freezerlist.repository.model.DrawerModel;
import at.home.freezerlist.repository.model.FreezerItemModel;
import at.home.freezerlist.rest.model.FreezerItem;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class FreezerItemServiceImpl implements FreezerItemService {

    @Autowired
    private FreezerItemRepository freezerItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ArrayList<FreezerItem> getFreezerItem() {
        List<FreezerItemModel> freezerItemModelList = freezerItemRepository.findAll();
        return modelMapper.map(freezerItemModelList, new TypeToken<List<FreezerItem>>() {
        }.getType());
    }

    @Override
    public FreezerItem getFreezerItem(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        return modelMapper.map(optionalFreezerItemModel.get(), FreezerItem.class);
    }

    @Override
    public FreezerItem createFreezerItem(FreezerItem freezerItem) {
        FreezerItemModel freezerItemModel = new FreezerItemModel();
        freezerItemModel.setContent(freezerItem.getContent());
        freezerItemModel.setFreezedate(freezerItem.getFreezedate());
        freezerItemModel.setDrawer(DrawerModel.valueOf(freezerItem.getDrawer().name()));
        freezerItemModel.setImage(freezerItem.getImage());
        freezerItemModel = freezerItemRepository.save(freezerItemModel);
        return modelMapper.map(freezerItemModel, new TypeToken<FreezerItem>() {
        }.getType());
    }

    @Override
    public FreezerItem updateFreezerItem(Long id, FreezerItem freezerItem) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        freezerItemModel.setContent(freezerItem.getContent());
        freezerItemModel.setFreezedate(freezerItem.getFreezedate());
        freezerItemModel.setDrawer(DrawerModel.valueOf(freezerItem.getDrawer().name()));
        freezerItemModel.setImage(freezerItem.getImage());
        freezerItemRepository.save(freezerItemModel);
        return modelMapper.map(freezerItemModel, FreezerItem.class);
    }

    @Override
    public void deleteFreezerItem(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        freezerItemRepository.delete(optionalFreezerItemModel.get());
    }
}


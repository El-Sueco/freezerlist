package at.home.freezerlist.service;

import at.home.freezerlist.repository.FreezerItemRepository;
import at.home.freezerlist.repository.model.FreezerItemModel;
import at.home.freezerlist.rest.model.FreezerItem;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FreezerItemServiceImpl implements FreezerItemService {

    @Autowired
    private FreezerItemRepository freezerItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ArrayList<FreezerItem> getFreezerItemList() {
        List<FreezerItemModel> freezerItemModelList = freezerItemRepository.findAll();
        return modelMapper.map(freezerItemModelList, new TypeToken<List<FreezerItem>>() {
        }.getType());
    }

    @Override
    public FreezerItem createFreezerItem(FreezerItem freezerItem) {
        FreezerItemModel freezerItemModel = new FreezerItemModel();
        freezerItemModel.setContent(freezerItem.getContent());
        freezerItemModel.setFreezedate(freezerItem.getFreezedate());
        freezerItemModel = freezerItemRepository.save(freezerItemModel);
        return modelMapper.map(freezerItemModel,  new TypeToken<FreezerItem>(){}.getType());
    }

    @Override
    public FreezerItem updateFreezerItem(String id, FreezerItem freezerItem) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void deleteFreezerItem(String id) {
        throw new UnsupportedOperationException("Not yet implemented");
    }
}


import React from "react";
import {Avatar, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {InsertPhoto} from "@mui/icons-material";
import TopicIcon from '@mui/icons-material/Topic';
import {File, fileType} from '../../types'
import { green, pink } from '@mui/material/colors';

type Props = {
    file:File
}

export const FileComponent = (props:Props) => {

    const renderCustomIcon = () => {
        return(
            props.file.type === fileType.PNG ?
                <Avatar sx={{ bgcolor: pink[500] }}><InsertPhoto/></Avatar> :
                <Avatar sx={{ bgcolor: green[500] }}><TopicIcon/></Avatar>
        )

    }

    const renderAvatar = () => {
      return(
          <ListItemIcon>
              {renderCustomIcon()}
          </ListItemIcon>
      )
    }

    return(
        <div>
            <ListItemButton>
                {renderAvatar()}
                <ListItemText primary={props.file.title} secondary={props.file.dateCreated} />
            </ListItemButton>
        </div>
    )
}

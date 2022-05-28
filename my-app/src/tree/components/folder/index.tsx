import React, {useRef, useState} from "react";
import {Avatar, Collapse, ListItemButton, ListItemIcon, ListItemText,LinearProgress} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {File, fileType} from '../../types';
import {FileComponent} from '../file';
import {treeActions} from "../../treeActions";
import {blue,} from "@mui/material/colors";
import './folder.css';

type Props = {
    folder: File;
    addChildren: (files:File[],folder: File) => void;
}

const TIME_UNTIL_FETCHING_DATA = 1000;

export const Folder = (props: Props) => {
    const [isOpen ,setIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const onFolderPress = async () => {
        if (props.folder?.children === undefined){
            setIsLoading(true);
            setTimeout(async ()=>{
                const randomChildren = await treeActions.getRandomChildren();
                props.addChildren(randomChildren,props.folder);
                setIsLoading(false);
            }, TIME_UNTIL_FETCHING_DATA);
        }
        setIsOpen(!isOpen)
    }

    const renderChildren = () => {
            return(
                props.folder?.children?.map((file) => {
                    return(
                        <div key={file.id} className={'Children'}>
                            {file.type === fileType.DIR ? <Folder key={file.id} folder={file} addChildren={props.addChildren}/> : <FileComponent key={file.id} file={file}/>}
                        </div>
                    )
                })
            )
        }

    const renderIcon = () => {
        return(
            <ListItemIcon>
                <Avatar sx={{ bgcolor: blue[500] }}>
                    <FolderIcon/>
                </Avatar>
            </ListItemIcon>
        )
    }

    return(
            <div>
                <ListItemButton onClick={()=>onFolderPress()}>
                    {renderIcon()}
                    <ListItemText primary={props.folder?.title} secondary={props.folder?.dateCreated}/>
                    {isOpen ? <ExpandMore /> : <ExpandLess /> }
                </ListItemButton>
                {isLoading ? <LinearProgress/> : undefined}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    {renderChildren()}
                </Collapse>
            </div>
    )
}

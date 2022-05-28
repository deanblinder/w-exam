import React, {useState} from "react";
import {File, fileType} from "./types";
import {Folder} from "./components/folder";
import {FileComponent} from "./components/file";
import './treeComponent.css';

type Props = {
    files: File[] | undefined;
}

export const Tree = (props: Props) => {
    const [tree, setTree] = useState<File[] | undefined>(props.files);

    const addChildren = (filesToAdd: File[], folder: File) => {
        folder.children = filesToAdd;
        setTree(tree ? [...tree] : undefined);
    }

    const renderFiles = () => {
        return(
            tree?.map((file) => {
                    return(
                        <div key={file.id}>
                            {file.type === fileType.DIR ? <Folder key={file.id} folder={file} addChildren={addChildren}/> : <FileComponent key={file.id} file={file}/>}
                        </div>
                    )
                })
        )
    }

    return(
        <div className={'folder'}>
            {renderFiles()}
        </div>
    )
}

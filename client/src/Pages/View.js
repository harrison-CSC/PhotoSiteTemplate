import React from "react";
import ViewWidget from '../Widgets/ViewWidget';
import PhotoCommentWidget from '../Widgets/PhotoCommentWidget';

function View() 
{
    return(
        <>
            <ViewWidget></ViewWidget>
            <PhotoCommentWidget></PhotoCommentWidget>
        </>
    );
};

export default View;
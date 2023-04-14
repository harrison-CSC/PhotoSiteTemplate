import { useEffect, useState } from "react"
import "./Widgets.css";

function AllImagesWidget(props)
{

    const [photosBoxArr, setPhotosBoxArr] = useState(null);
    const [noPhotosNotice, setNoPhotosNotice] = useState(null);

    let count = false;

    useEffect(function()
    {
        async function fetchData()
        {
            const response = await fetch(`http://localhost:3001/fetchImages`, { method: "post" })
            const newData = await response.json();

            let tempPhotoBox = [];

            for (let i = 0; i < newData.length; i++)
            {
                tempPhotoBox.push(
                    <a href={"/view/" + newData[i]["photoID"]}>
                        <div class="photoBox">
                            <img class="photo" src={"http://localhost:3001/fetchImageBackend/" + newData[i]["photoID"]} alt=""></img>
                            <h2>{newData[i]["title"]}</h2>
                        </div>
                    </a>
                );
            }
            setPhotosBoxArr(tempPhotoBox);
        
            if (newData.length === 0)
                setNoPhotosNotice(<h3>Be the first to post an image!</h3>);
            else
                setNoPhotosNotice(null);

        }
        fetchData();
    }, []);
      

    return (
        <div id="loginPrompt">
            <h1>Images</h1>
            <div>
                {noPhotosNotice}
            </div>
            <ul id="photoBoxContainer">
                {photosBoxArr}
            </ul>   
        </div>
    )

}

export default AllImagesWidget;

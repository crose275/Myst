import React, {useState, useEffect} from "react";
import pic from '/src/assets/game-description-image.webp';
import UserDefinedTags from "./UserDefinedTags";
import "/src/styles/GameDescription.css"

function GameDescription(){
    return(
        <div className="gameDescription">
            <div className="pictureDiv">
                <img className="pic"src={pic}/>
            </div>
            <div className="description">
                Named Game of the Year by over 50 publications, 
                Valve's debut title blends action and adventure with award-winning technology to create a frighteningly realistic world where players must think to survive. 
                Also includes an exciting multiplayer mode that allows you to play against friends and enemies
                
            </div>
            <br></br>
            <div className="reviewSum">
                <div className="reviewText">Recent Reviews:</div> <span className="reviewSpan">Overwelmingly Possive</span>
            </div>
            <div className="reviewSum">
                <div className="reviewText">All Reviews:</div> <span className="reviewSpan">Overwelmingly Positive</span>
            </div>
            <div className="releaseSum">
                <div className="releaseText">Release Date: </div> <div className="releaseDate">Nov 8, 1998</div>
            </div>
            <div className="devRow">
                <div className="devRowText">Developer:</div> <a className="devRowLink" href="https://store.steampowered.com/developer/valve">Valve</a>
                
            </div>
            <div className="devRow">
                <div className="devRowText">Publisher:</div><a className="devRowLink"href="https://store.steampowered.com/developer/valve">Valve</a>
            </div>
            <br></br>
            <div className="tagIntro">
                Popular user-defined tags for this product:
            </div>
            <div className="tagDiv">
                <UserDefinedTags />
            </div>
        </div>
        
    )
}

export default GameDescription;
import React, {useContext} from "react";
import "../styles/NavBarBM.css";
import ModalContext from "../context/ModalContext";




function NavBarBM (){
    const {handleYourStoreMouseOver} = useContext(ModalContext);
    const {handleNewAndNoteWorthyMouseOver} = useContext(ModalContext)
    const {handleCategoriesMouseOver} = useContext(ModalContext)
    const {handleYourStoreMouseExit} = useContext(ModalContext)
    const {handleNewAndNoteWorthyMouseExit} = useContext(ModalContext)
    const {handleCategoriesMouseExit} = useContext(ModalContext)
    return(
        <div className="headerContainer">
            <div className="headerSubContainer">
                <div className="content">
                    <div className="controls">
                    </div>
                    <div className="navBox">
                        <div className="navLeftCap"></div>
                        <div className="navBtns">
                            <div className="storeNav">
                                <div className="tab">
                                    <span className="navSpan" >
                                        <a className="navATag"   href="https://store.steampowered.com/" onMouseEnter={handleYourStoreMouseOver} onMouseLeave={handleCategoriesMouseExit}>Your Store</a>
                                        <span></span>
                                    </span>
                                </div>
                                <div className="tab">
                                    <span className="navSpan" >
                                        <a className="navATag"  onMouseEnter={handleNewAndNoteWorthyMouseOver} onMouseLeave={handleNewAndNoteWorthyMouseExit}>New & Noteworthy</a>
                                        <span></span>
                                    </span>
                                </div>
                                <div className="tab" >
                                    <span className="navSpan" >
                                        <a className="navATag" onMouseEnter={handleCategoriesMouseOver} onMouseLeave={handleCategoriesMouseExit}>Categories</a>
                                        <span></span>
                                    </span>
                                </div>
                                <div className="tab">
                                <a className="navATag" href="https://store.steampowered.com/points/shop">
                                    <span>Points Shop</span>
                                </a>
                                </div>
                                <div className="tab">
                                <a className="navATag" href="https://store.steampowered.com/news/">
                                    <span>Store</span>
                                </a>
                                </div>
                                <div className="tab">
                                <a className="navATag" href="https://store.steampowered.com/labs/">
                                    <span>Labs</span>
                                </a>
                                </div>
                                <div className="naveSpacer"></div>
                                <div className="searchBox">
                                    <div className="navSearch">
                                        <form className="searchForm">
                                            <div className="search" >
                                                <input placeholder="search"></input>
                                                <a className="searchBtn" href="https://store.steampowered.com/search/?term=">
                                                    <img className="srchImg" src="https://store.cloudflare.steamstatic.com/public/images/blank.gif"></img>
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="navRightCap"></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default NavBarBM;
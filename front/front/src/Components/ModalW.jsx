import React from "react";


const ModalW = ({active, setActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                qqq
            </div>
        </div>
    )
}

export default ModalW;
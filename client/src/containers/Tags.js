import React, { useState } from 'react';
import './tags.css'

const Tags = ({ tags, setTags }) => {
    const [newTag, setNewTag] = useState('')
    const handleChange = (e) => {
        setNewTag(e.target.value)
    }
    const handleRemoveTag = (e,index) => {
        e.preventDefault()
        let cloneTags = [...tags]
        if(index && index !==-1){
            cloneTags.splice(index, 1)
            setTags(cloneTags)
            setNewTag('')
        }
    }
    const handleKeyDown = (e) => {
            if(e.keyCode === 13 && newTag !==''){
                let tag = newTag
                let index = tags.indexOf(tag)
                if (index === -1) {
                    setTags([...tags,tag])
                    setNewTag('')
                    e.target.value = ''
                }
            }
    }
    return (
        <div>
            <div className="tags-input">
                {tags && tags.map((tag,index) => (
                    <span className="tag"key={index}>{tag} 
                        <button className="delete" onClick={(e)=>handleRemoveTag(e,index)} />
                    </span>
                ))}
                <input type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
            </div>
            <span className="help"></span>
        </div>
    )
}

export default Tags

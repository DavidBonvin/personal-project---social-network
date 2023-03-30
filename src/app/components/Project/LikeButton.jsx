import React, {useState,useEffect} from "react";
import { HeartIcon as HeartIconfull } from "@heroicons/react/solid";
import { HeartIcon as HeartIconEmpty } from "@heroicons/react/outline";
import {postLike} from '../../api/backend/like'

function LikeButton({ isLogged, project, setProject}) {
	return (
        <div className={`border-gradient-v border-2 rounded-lg text-primary px-1 flex flex-wrap justify-center items-center max-w-fit`}>
            
            {isLogged ? (
                <button 
                    type="button" 
                    className={`mr-1`} 
                    onClick={async () => {
                        await postLike({uuid_project : project.uuid}).then((res) => {
                            
                            const newProject = project
                            {project.liked ? newProject.liked = false : newProject.liked = true}
                            {res.data.isliked ? newProject.countLikes+=1 : newProject.countLikes-=1}
                            setProject(project => ({...project,...newProject}));
                        }).catch((err) => {
                            console.log(err)
                        })
                        //setlikes(likes+1)
                    }}
                > 
                {project.liked ? (
                <HeartIconfull className='h-5 w-5 my-1'/>
                ) : (
                <HeartIconEmpty className='h-5 w-5 my-1'/>
                )}
			    
		        </button>
            ) : <HeartIconEmpty className='h-5 w-5 my-1 mr-1'/>
            }
            {`${project.countLikes}`}
        </div>
		
	);
}

export default LikeButton;
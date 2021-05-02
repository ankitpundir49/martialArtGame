let c=document.getElementById("my-canvas");
let ctx=c.getContext("2d");

let loadImage=(src,callback)=>
{   let img=document.createElement("img");
    img.onload=()=>callback(img);
    img.src=src;
};
let imagePath=(frameNumber,animation)=>
{   return "/images/"+animation+"/"+frameNumber+".png";
};
let frame=
{   idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    forward:[1,2,3,4,5,6],
    backward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9]
};
let loadImages=(callback)=>
{   let images={idle:[],kick:[],punch:[],forward:[],backward:[],block:[]};
    let imagesToLoad=0;
    ["idle","kick","punch","forward","backward","block"].forEach((animation)=>
    {   let animationFrame=frame[animation];
        imagesToLoad=imagesToLoad+animationFrame.length;
        animationFrame.forEach((frameNumber)=>
        {  let path=imagePath(frameNumber,animation);
            loadImage(path,(image)=>
            {   images[animation][frameNumber-1]=image;
                imagesToLoad=imagesToLoad-1;
                if(imagesToLoad===0)
                    {   callback(images);
    
                    }
            }); 
        });
    });
};
let animation=(ctx,images,animation,callback)=>
{   images[animation].forEach((image,index)=>
    {   setTimeout(()=>
        {   ctx.clearRect(0, 0, 1000, 500); 
            ctx.drawImage(image,0,0,500,500);

        },index*100);
    });
    setTimeout(callback,images[animation].length*100)
};


loadImages((images)=>
{  
    let queueAnimation=[];
    let auxilating=()=>
    {   let repeatAnimation;
        if(queueAnimation.length===0)
        {   repeatAnimation="idle";
        }else
        {   repeatAnimation=queueAnimation.shift(); 
        }
        animation(ctx,images,repeatAnimation,auxilating)
    };
    auxilating();
    document.getElementById("kick").onclick=()=>
    {   queueAnimation.push("kick");
    };
    document.getElementById("punch").onclick=()=>
    {   queueAnimation.push("punch");
    };
    document.getElementById("block").onclick=()=>
    {   queueAnimation.push("block");
    };
    document.getElementById("forward").onclick=()=>
    {   queueAnimation.push("forward");
    };
    document.getElementById("backward").onclick=()=>
    {   queueAnimation.push("backward");
    };
    document.addEventListener("keyup",(event)=>
    {   const key=event.key;
        if(key==="s")
        {queueAnimation.push("kick");}
        if(key==="a")
        {queueAnimation.push("punch");}
        if(key==="d")
        {queueAnimation.push("block");}
        if(key==="ArrowRight")
        {queueAnimation.push("forward");}
        else if(key==="ArrowLeft")
        {queueAnimation.push("backward");}

    });
});

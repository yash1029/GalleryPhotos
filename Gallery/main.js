

function getElement(container){
  let element = document.querySelector(container);
  return element || null;
}



class Gallery{
    constructor(element){
        this.element = element;
        this.list =  Array.from(this.element.children);
        this.element.addEventListener('click',(e)=>{this.handleClick(e)})
        this.mainDiv = document.querySelector('.images');
        this.modalPreview = document.querySelector('.image-preview');  
        this.selectedPic = document.querySelector('.modal-content').firstElementChild;
        this.modal = document.querySelector('.modal')
        this.closeBtn = this.modal.querySelector('.close');
        this.prevBtn = this.modal.querySelector('.prev');
        this.nextBtn = this.modal.querySelector('.next');
        this.handleClose = this.handleClose.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleClick(e){
       if(e.target.classList.contains('img')){
              this.openModal(e.target.getAttribute('src'));
       }
    }

    openModal(src){
       
        this.selectedPic.src = src;
        const list = this.list.map((image, index)=>{
           return `<img class='img' src='${image.src}' alt='image' data-id='${index}'/>`
        }).join("");
        this.modalPreview.innerHTML = list;
        this.mainDiv.classList.add('blurred');
        this.modal.style.display = 'flex';      
        this.activateButtons()
        this.glowImages(this.selectedPic.src);
    }

    glowImages(currentSrc, previousSrc = null){
         const imageArray = Array.from(this.modalPreview.children);
        const presentImage = imageArray.find(img => img.src === currentSrc);
        const previousImage = imageArray.find(img => img.src === previousSrc);
        presentImage.classList.add('selected');
        const width = imageArray[0].offsetWidth;
        const currentId = presentImage.dataset.id;
        const previousId = previousImage?.dataset.id;


        

        if(previousSrc){
            previousImage.classList.remove('selected');
       if(currentId > previousId){

        imageArray.forEach(image => {
            image.style.transform =  `translateX(${-1*Number.parseInt(currentId)*width}px)`;
       })
       }else{
        
        imageArray.forEach(image => {
            image.style.transform =  `translateX(${1*width}px)`;
       })
       }
            
        }else{
           
            imageArray.forEach(image => {
                image.style.transform =  `translateX(${-1*Number.parseInt(currentId)*width}px)`;
           })   
        }
    
      
      
        
    }

    activateButtons(){
        
        this.closeBtn.addEventListener('click', this.handleClose);
        this.prevBtn.addEventListener('click',this.handlePrev)
        this.nextBtn.addEventListener('click',this.handleNext);
    }

    removeListeners(){
    
        this.closeBtn.removeEventListener('click', this.handleClose);
        this.prevBtn.removeEventListener('click',this.handlePrev);
        this.nextBtn.removeEventListener('click',this.handleNext);
    }


    handleClose(){
       this.modal.style.display = 'none';
       this.mainDiv.classList.remove('blurred');
       this.removeListeners();
    }

    handlePrev(){
        this.handleChange('prev');
    }

    handleNext(){
        this.handleChange('next');  
    }

    handleChange(eve){
       const newList = Array.from(this.modalPreview.children);
       const currentImage = newList.find(image => image.src === this.selectedPic.src);
       let currentIndex = currentImage.dataset.id;
       const isPrev = eve === 'prev' ? true : false; 
       const length = newList.length;
       currentIndex = Number.parseInt(currentIndex);
       if(currentIndex > 0 && isPrev){  
           this.selectedPic.src = newList[currentIndex-1].src;
           this.glowImages(this.selectedPic.src, newList[currentIndex].src);
        }else if(currentIndex < length-1 && !isPrev){
            this.selectedPic.src = newList[currentIndex+1].src;
            this.glowImages(this.selectedPic.src, newList[currentIndex].src);
       }
       
    }

   
    
}


let Nature = new Gallery(getElement('.nature'));
let Japan = new Gallery(getElement('.city'));       
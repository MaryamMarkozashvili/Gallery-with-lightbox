//ვიღებ ყველა საჭირო ელემენტს
const filterItem = document.querySelector('.items');
const filterImg = document.querySelectorAll(".image");
var allImage = document.querySelectorAll('.image')
window.onload = () => { //once window loaded
    filterItem.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains("item")) { //თუ მომხმარებელი დააჭერს აითემს, კლასით .item
            filterItem.querySelector(".active").classList.remove("active"); //აქტივ კლასის გაქუმება, რომელიც პირველ ელემენტს აქვს
            selectedItem.target.classList.add("active"); //აქტივ კლასის დამატება მომხმარებლის მიერ შერჩეულ აითემზე
            let filterName = selectedItem.target.getAttribute("data-name"); //მომხმარებლის მიერ შერჩეული აითემის data-name-ის მნიშვნელობის მიღება და ფილტრისთვის საჭირო ცვლადში შენახვა
            filterImg.forEach((image) => {
                let filterImages = image.getAttribute("data-name"); //ფოტოს data-name მნიშვნელობის მიღება
                //თუ მომხმარებლის მიერ შერჩეული აითემის data-name მნიშვნელობა უდრის ფოტოს data-name მნიშვნელობას
                //ან თუ მომხმარებლის მიერ შერჩეული აითემის data-name მნიშვნელობა უდრის "all"
                if ((filterImages == filterName) || filterName == "all") {
                    image.classList.remove("hide");
                    image.classList.add("show");
                } else {
                    image.classList.add("hide");
                    image.classList.remove("show");

                }
            });
        }
        allImage = document.querySelectorAll('.show')
        pagination()
    }
    for (let i = 0; i < filterImg.length; i++) {
        filterImg[i].setAttribute("onclick", "preview(this)"); //ონქლიქ ატრიბუტს ვამატებ ყველა ხედვის არეში მყოფ ფოტოზე
    }
    // 📌📌📌📌📌📌📌 აქ ეშვება გეიჯინეიშენის ფუნქცია
    pagination()
}
//ვიღებ ყველა საჭირო ელემენტს და ვინახავ ცვლადებში
const previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    categoryName = previewBox.querySelector(".title p"),
    closeIcon = previewBox.querySelector(".icon"),
    shadow = document.querySelector(".shadow");
//ლაითბოქსის ფუნქცია

function preview(element) {
    //როცა მომხმარებელი დააჭერს რომელიმე ფოტოზე გასადიდებლად, ვაქრობ სქროლს, რომ ვერ შეძლოს დასქროლვა ვერცერთი მიმართულებით.
    document.body.style.overflow = "hidden";
    let selectedPrevImg = element.querySelector("img").src; //ვიღებ მომხმარებლის მიერ დაკლიკებული ფოტოს სორსს და ვინახავ ცვლადში
    let selectedImgCategory = element.getAttribute("data-name"); //ვიღებ დაკლიკებულ data-name მნიშვნელობას
    categoryName.textContent = selectedImgCategory; //data-name მნიშვნელობა გადამაქვს კატეგორიის ტექსრურ კონტენტში 
    previewImg.src = selectedPrevImg; //მომხმარებლის მიერ დაკლიკებული ფოტოს სორსს ვატან ლაითბოქსის ფოტოს ცვლადს.
    previewBox.classList.add("showBox"); //ლაითბოქსის ჩვენება
    shadow.classList.add("showBox"); //ღია შავი უკანაფონის ჩვენება
    closeIcon.onclick = () => { //თუ მომხმარებელი დააჭერს დახურვის იქსს ლაითბოქსზე
        previewBox.classList.remove("showBox");
        //დაიმალება ბოქსი
        shadow.classList.remove("showBox"); //და ასევე დაიმალება შავი ბექგრაუნდიც


        // 📌📌📌📌📌📌📌 აქ ვანულებ ფუნქციას,removEventListener არის იგივე.
        onkeydown = (e) => { }
    }
    var existingImageDiv = document.querySelectorAll('.show')
    slider(existingImageDiv, element)


}

function slider(arr, element) {
    var existingImages = []
    var counter;
    var sliderImage = document.querySelector('.sliderImage')
    arr.forEach((image, index) => {
        if (image == element) {
            counter = index
        }
        existingImages.push(image.children[0].children[0])
    })
    var leftArrow = document.querySelector('.left')
    var rightArrow = document.querySelector('.right')

    leftArrow.onclick = () => {
        counter--
        if (counter < 0) {
            counter++
            return
        }
        sliderImage.src = existingImages[counter].src
        var categoryData = arr[counter].getAttribute('data-name')
        document.querySelector('.title').querySelector('p').textContent = categoryData
    }
    rightArrow.onclick = () => {
        counter++
        if (counter >= arr.length) {
            counter--
            return
        }
        sliderImage.src = existingImages[counter].src
        var categoryData = arr[counter].getAttribute('data-name')
        document.querySelector('.title').querySelector('p').textContent = categoryData
    }
    // 📌📌📌📌📌📌📌 keypress ფუნქცია, გადასვლა გადმოსვლა ღილაკებისთვის.
    onkeydown = (e) => {
        if (e.keyCode == '37') {
            counter--
            if (counter < 0) {
                counter++
                return
            }
            sliderImage.src = existingImages[counter].src
            var categoryData = arr[counter].getAttribute('data-name')
            document.querySelector('.title').querySelector('p').textContent = categoryData
        }
        if (e.keyCode == '39') {
            counter++
            if (counter >= arr.length) {
                counter--
                return
            }
            sliderImage.src = existingImages[counter].src
            var categoryData = arr[counter].getAttribute('data-name')
            document.querySelector('.title').querySelector('p').textContent = categoryData
        }
    }
}
// 📌📌📌📌📌📌📌📌📌 
function pagination() {
    // 📌📌📌📌📌📌📌📌📌 numeration ცვლადი აკონტროლებს რამდენი უნდა გამოვიდეს გვერდზე,     
    var numeration = 8

    // 📌📌📌📌📌📌📌📌📌აქ ყველა სურათის დივია შეტანილი და მარტო პირველი 8
    // 📌📌📌📌📌📌📌📌📌 გამომაქვს (თუ 8-ს უტოლდება ინდექსი show კლასს აშორებს და hide ადებს)
    allImage.forEach((element, index) => {
        if (index >= 8) {
            element.classList.remove('show')
            element.classList.add('hide')
        }
    })
    // 📌📌📌📌📌📌📌📌📌ღილაკები
    var prev = document.querySelector('.previousPage')
    var next = document.querySelector('.nextPage')

    next.onclick = () => {
        // 📌📌📌📌📌 რადგან შემდეგ გვერდზე გდასვლისას უნდა გამოვიდეს შემდეგი 8, დაბლა numeration+=8 მიწერია, მაგრამ მაქამდე ვამოწმებ
        // 📌📌📌📌📌 ხომ არ გადაცდა სურათების რაოდენობას, თუ გადასცა, მაშინ არაფერს აღარ გააკეთებს. 
        if (numeration > allImage.length) return
        numeration += 8
        // 📌📌📌📌📌 gap-ით ვიგებ საიდან უნდა დაიწყოს show-ს დადება. თავიდან numeration არის 8, ანუ როცა ფუნქცია გაეშვება, 0-დან 8-მდე რა 
        // 📌📌📌📌📌 ელემენტების არიც, 0 1 2 3 4 5 6 7 8 ინდექსებით ამეებს დაადებს.
        var gap = numeration - 8
        var existedImages = document.querySelectorAll('.show')
        existedImages.forEach((element) => { element.classList.remove('show'); element.classList.add('hide') })
        allImage.forEach((element, index) => {
            if (index >= gap && index < numeration) {
                element.classList.add('show')
                element.classList.remove('hide')
            }
        })
    }

    // 📌📌📌📌📌📌📌📌📌 იგივე პრინციპი ვრცელდება ზუსტად აქ ყველაფერი იგივეა, უბრალოდ numeration-=8 იმიტომ მიწერია, 
    // 📌📌📌📌📌📌📌📌📌 რომ წინა 8 ელემენტი უნდა გამოჩნდეს.
    prev.onclick = () => {
        numeration -= 8
        if (numeration <= 0) {
            numeration = 8
            return
        }
        var gap = numeration - 8
        var existedImages = document.querySelectorAll('.show')
        existedImages.forEach((element) => { element.classList.remove('show'); element.classList.add('hide') })
        allImage.forEach((element, index) => {
            if (index >= gap && index < numeration) {
                element.classList.add('show')
                element.classList.remove('hide')
            }
        })
    }
}
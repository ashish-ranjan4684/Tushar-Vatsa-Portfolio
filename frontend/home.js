let domains = ["Full Stack Developer.","AI Engineer."];
let about_domain = document.getElementById("about-line2");
let resume_btn = document.getElementById("resume-btn");
let hamburger = document.getElementById("hamburger");
let talkEl = document.querySelector(".talk");
let menu = document.getElementById("menu");
let carouselItems = document.querySelectorAll(".carousel-item");

/*carouselItems.forEach((item,index)=>{
    item.document.createElement("span").classList.add("blinking-dot");
});*/

/*hamburger.addEventListener("click",()=>{
    menu.classList.toggle("active");
});*/

talkEl.addEventListener("click",async()=>{
    window.location.href="/talk";

});
async function typeWriter(){
    let i = 0;
    while (true) { // Loop infinitely
        let domain = domains[i];
        
        // 1. Typing Phase
        for (let j = 0; j <= domain.length; j++) {
            about_domain.innerText = domain.slice(0, j);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 2. Pause at the end
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 3. Backspacing Phase
        for (let j = domain.length; j >= 0; j--) {
            about_domain.innerText = domain.slice(0, j);
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // 4. Move to next domain
        i = (i + 1) % domains.length;
    }
}

typeWriter();

resume_btn.addEventListener("click",async()=>{
    console.log("Resume button clicked");
    let result = await fetch("/resume",{
        method:"GET",
        headers:{
            "Content-Type":"application/pdf"
        }
    });

    if(result.status === 200){
        let blob = await result.blob();
        let url = URL.createObjectURL(blob);
        window.open(url,"_blank");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            // Toggle classes to open/close menu layout
            menu.classList.toggle("active");
            hamburger.classList.toggle("active");

            // Dynamically alter character view states between hamburger and close sign
            if (hamburger.classList.contains("active")) {
                hamburger.innerHTML = "&#10005;"; // Unicode code for "✕" (Close cross)
            } else {
                hamburger.innerHTML = "&#9776;";  // Unicode code for "☰" (Hamburger lines)
            }
        });

        // Optional convenience feature: close the overlay menu layout when any link item gets tapped
        const menuItems = menu.querySelectorAll(".menuitem");
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                menu.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.innerHTML = "&#9776;";
            });
        });
    }
});
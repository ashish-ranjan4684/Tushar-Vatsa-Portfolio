let domains = ["Full Stack Developer.","AI Engineer."];
let about_domain = document.getElementById("about-line2");
let resume_btn = document.getElementById("resume-btn");
let hamburger = document.getElementById("hamburger");
let talkEl = document.querySelector(".talk");
let menu = document.getElementById("menu");

hamburger.addEventListener("click",()=>{
    menu.classList.toggle("active");
});

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
})
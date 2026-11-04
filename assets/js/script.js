$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling, kept clear of the fixed navbar
    $('a[href*="#"]').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (!target.length) return;
        e.preventDefault();
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 72,
        }, 700, 'swing');
    });

    function gmailComposeUrl(form) {
        const name = String(form.name.value || "").trim();
        const email = String(form.email.value || "").trim();
        const phone = String(form.phone.value || "").trim();
        const message = String(form.message.value || "").trim();
        const subject = encodeURIComponent("Portfolio message from " + (name || "someone"));
        const body = encodeURIComponent(message + "\n\nFrom: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : ""));
        return "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent("valupadasurevanth@gmail.com") + "&su=" + subject + "&body=" + body;
    }

    $("#contact-form").submit(function (event) {
        event.preventDefault();
        window.location.assign(gmailComposeUrl(this));
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Revanth Valupadasu";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Explainable AI", "Cyber-Physical Systems", "Edge Machine Learning", "Reinforcement Learning"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

const themeBtn = document.getElementById("theme-toggle");

function setParticleColor(hex) {
    try {
        const inst = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
        if (!inst) return;
        inst.particles.color.value = hex;
        inst.particles.line_linked.color = hex;
        if (inst.particles.line_linked.color_rgb_line !== undefined && window.hexToRgb) {
            inst.particles.line_linked.color_rgb_line = window.hexToRgb(hex);
        }
        inst.fn.particlesRefresh();
    } catch (error) {
        console.warn("Could not recolor particles", error);
    }
}

function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    if (!themeBtn) return;
    const icon = themeBtn.querySelector("i");
    icon.className = dark ? "fas fa-sun" : "fas fa-moon";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", dark ? "dark" : "light");
    setParticleColor(dark ? "#9eb0ff" : "#000000");
}

if (themeBtn) {
    applyTheme(localStorage.getItem("theme") === "dark");
    themeBtn.addEventListener("click", function () {
        applyTheme(!document.body.classList.contains("dark"));
    });
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 700,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

document.querySelectorAll(".board-viewer .Hotspot").forEach(function (hotspot) {
    hotspot.addEventListener("click", function (event) {
        event.stopPropagation();
        document.querySelectorAll(".board-viewer .Hotspot").forEach(function (other) {
            if (other !== hotspot) other.classList.remove("active");
        });
        hotspot.classList.toggle("active");
    });
});
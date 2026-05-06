document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector("i")

  const savedTheme = localStorage.getItem("theme") || "dark"
  setTheme(savedTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)

    themeToggle.style.transform = "scale(0.8) rotate(180deg)"
    setTimeout(() => {
      themeToggle.style.transform = "scale(1) rotate(0deg)"
    }, 200)
  })

  function setTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light")
      themeIcon.className = "fas fa-sun"
    } else {
      document.documentElement.removeAttribute("data-theme")
      themeIcon.className = "fas fa-moon"
    }
    localStorage.setItem("theme", theme)
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Fecha menu mobile
        const menuToggle = document.getElementById("menu-toggle")
        if (menuToggle.checked) {
          menuToggle.checked = false
        }
      }
    })
  })

  const header = document.querySelector("header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.15,
    }
  )

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })

  const heroImage = document.querySelector(".img-topo-site img")

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY

    if (heroImage) {
      heroImage.style.transform = `
        translateY(${scrolled * -0.2}px)
        scale(1.05)
      `
    }
  })

  const glow = document.createElement("div")
  glow.classList.add("cursor-glow")
  document.body.appendChild(glow)

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px"
    glow.style.top = e.clientY + "px"
  })

  const projects = document.querySelectorAll(".project-item")

  projects.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
    })
  })

  const inputs = document.querySelectorAll("input, textarea")

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)"
      this.style.boxShadow = "0 5px 20px rgba(124,58,237,0.3)"
    })

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "none"
    })

    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.style.borderColor = "#7c3aed"
      } else {
        this.style.borderColor = "#ef4444"
      }
    })
  })

  document.querySelectorAll("img").forEach((img) => {
    img.style.opacity = "0"
    img.style.transform = "scale(0.95)"

    img.addEventListener("load", function () {
      this.style.opacity = "1"
      this.style.transform = "scale(1)"
    })

    if (img.complete) {
      img.style.opacity = "1"
      img.style.transform = "scale(1)"
    }
  })

  function debounce(fn, delay) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  document
    .querySelectorAll(".especialidades-box, .project-item, .btn-social button")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.willChange = "transform"
      })
      el.addEventListener("mouseleave", () => {
        el.style.willChange = "auto"
      })
    })
})
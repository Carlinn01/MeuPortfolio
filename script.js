document.addEventListener("DOMContentLoaded", () => {
  // Sistema de Tema
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector("i")
  const body = document.body

  // Carrega tema salvo ou define padrão como escuro
  const savedTheme = localStorage.getItem("theme") || "dark"
  setTheme(savedTheme)

  // Alternância de tema
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // Animação do botão
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

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Fecha menu mobile se estiver aberto
        const menuToggle = document.getElementById("menu-toggle")
        if (menuToggle.checked) {
          menuToggle.checked = false
        }
      }
    })
  })

  // Efeito de scroll no header
  const header = document.querySelector("header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    // Adiciona classe scrolled quando rola para baixo
    if (currentScrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Header hide/show otimizado
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  // Animações de entrada com Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observa elementos com animação de entrada
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })

  // Animação escalonada para especialidades
  const especialidadesBoxes = document.querySelectorAll(".especialidades-box")
  especialidadesBoxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.2}s`
  })

  // Efeito parallax sutil no hero
  const heroSection = document.querySelector(".topo-do-site")
  const heroImage = document.querySelector(".img-topo-site img")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    if (heroImage && scrolled < heroSection.offsetHeight) {
      heroImage.style.transform = `translateY(${rate}px)`
    }
  })

  // Melhoria no formulário
  const form = document.querySelector("form")
  const inputs = form.querySelectorAll("input, textarea")

  inputs.forEach((input) => {
    // Efeito de foco melhorado
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)"
      this.style.boxShadow = "0 5px 20px rgba(11, 3, 205, 0.3)"
    })

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "none"
    })

    // Validação em tempo real
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.style.borderColor = "#4c6ef5"
      } else {
        this.style.borderColor = "#ef4444"
      }
    })
  })

  // Loading otimizado para imagens
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
      this.style.transform = "scale(1)"
    })

    // Fallback se a imagem já estiver carregada
    if (img.complete) {
      img.style.opacity = "1"
      img.style.transform = "scale(1)"
    }
  })

  // Otimização de performance - debounce para scroll
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }


  // Preload de hover states para melhor performance
  const hoverElements = document.querySelectorAll(".especialidades-box, .img-portfolio, .btn-social button")
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      this.style.willChange = "transform, box-shadow"
    })

    el.addEventListener("mouseleave", function () {
      this.style.willChange = "auto"
    })
  })


  const style = document.createElement("style")
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        img {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.5s ease;
        }
    `
  document.head.appendChild(style)

})

import React, { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // Define the missing variables and functions
    let stars = [];
    let fireworks = [];
    let particles = [];

    function drawBackground() {
      // Implement the drawBackground function
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function createFirework() {
      // Implement the createFirework function
      const firework = new Firework();
      fireworks.push(firework);
    }

    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height;
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`; // Random color
      }

      update() {
        // Implement the update function
        this.y -= 5;
      }

      explode() {
        const particleCount = 100; // Number of particles to create
        for (let i = 0; i < particleCount; i++) {
          const particle = new Particle(this.x, this.targetY, this.color); // Pass the firework's color to the particle
          particles.push(particle); // Add particles to the array
        }
      }

      draw() {
        if (this.done) {
          this.explode(); // Call explode if done
        } else {
          // Implement the draw function
          ctx.fillStyle = this.color; // Use random color
          ctx.beginPath();
          ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      get done() {
        return this.y < this.targetY;
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // Random size for particles
        this.speedX = Math.random() * 6 - 3; // Random horizontal speed
        this.speedY = Math.random() * 6 - 3; // Random vertical speed
        this.color = color; // Use the passed color for the particle
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Gradually shrink the particle
      }

      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      drawBackground();
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      fireworks.forEach((firework) => firework.update());
      fireworks.forEach((firework) => firework.draw());
      if (Math.random() < 0.03) {
        createFirework();
      }
      fireworks = fireworks.filter((firework) => !firework.done);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        if (particle.size <= 0.5) {
          particles.splice(index, 1); // Remove small particles
        }
      });
    };

    animate();

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const firework = new Firework();
      firework.x = x;
      firework.y = canvas.height;
      firework.targetY = y;
      fireworks.push(firework);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      // Clean up canvas event listeners if necessary
    };
  }, []);

  return (
    <canvas id="fireworksCanvas" style={{ position: 'absolute', top: 0, left: 0 }} />
  );
};

export default Background;

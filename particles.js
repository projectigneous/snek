var particles = {
    particles: [],
    create: function(x,y,col) {
        var particle = {
            x,y,col,
            z: Math.random()*3,
            vx:-5 + Math.random()*10,
            vy: -5 + Math.random()*10,
            vz: 0.075
        }
        particles.particles.push(particle)
    },
    render: function(ctx, speed) {
        if (!speed) {speed = 1}
        ctx.fillStyle = "#fff";
        for (var particle of particles.particles) {
            if (particle.z > 0 ) {
                try {
                    ctx.fillStyle = particle.col
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.z, 0, Math.PI*2, false);
                    ctx.fill();
                    //ctx.stroke()
                } catch(e) {}
                
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                particle.z -= particle.vz * speed;
            }

            if (particle.z <= 0) {
                delete particle
            }
        }
    }
};
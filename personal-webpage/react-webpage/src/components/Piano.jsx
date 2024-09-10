import { useEffect, useRef } from 'react'

const Piano = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const white_key_len = 146, white_key_wid = 22, black_key_len = 95, black_key_wid = 12
    const width = canvas.width, height = canvas.height;
    
    let p = 0
    let mouse_x = 0
    let x = 1
    let y = 0
    let wk_wid = white_key_wid*x
    let wk_len = white_key_len*x
    let bk_wid = black_key_wid*x
    let bk_len = black_key_len*x


    const draw_white = (x1, y1, wid, len) => {
      ctx.beginPath()
      ctx.rect(x1, y1, wid, len)
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgb(222,250,50)'
      ctx.fillStyle = '#EA420D'
      ctx.fill()
      ctx.stroke()
    }

    const draw_black = (x1, y1, wid, len) => {
      ctx.beginPath()
      ctx.rect(x1, y1, wid, len)
      ctx.lineWidth = 2
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.stroke()
    }

    const drawPiano = () => {
      ctx.clearRect(0, 0, width, height) // Clear the canvas

      // Draw white keys
      while (y < width) {
        draw_white(y, height - wk_len, wk_wid, wk_len)
        y += wk_wid
      }

      // Draw black keys
      y = 0
      draw_black(y - bk_wid / 2, canvas.height - wk_len, bk_wid, bk_len) // black keys start with A#
      y += wk_wid
      while (y < canvas.width - wk_wid) {
        y += wk_wid
        draw_black(y - bk_wid / 1.5, canvas.height - wk_len, bk_wid, bk_len) // 2 black keys
        y += wk_wid
        draw_black(y - bk_wid / 3, canvas.height - wk_len, bk_wid, bk_len)
        y += 2 * wk_wid // skipping 1
        draw_black(y - bk_wid / 2, canvas.height - wk_len, bk_wid, bk_len) // 3 black keys
        y += wk_wid
        draw_black(y - bk_wid / 2, canvas.height - wk_len, bk_wid, bk_len)
        y += wk_wid
        draw_black(y - bk_wid / 2, canvas.height - wk_len, bk_wid, bk_len)
        y += wk_wid // skipping 1
      }
    }

    const animate = () => {
      p += 0.01
      if (p > 1.5) p = 0
      const rad = 5 * x
      const falling_func = height - wk_len - Math.abs(Math.sin(p*Math.PI)) * (height - wk_len)
      ctx.clearRect(0, 0, width, height - wk_len)
      ctx.beginPath()
      ctx.arc(mouse_x, falling_func, rad, 0, Math.PI * 2)
      ctx.stroke()
      if (falling_func < height - wk_len - rad) {
        requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, width, height - wk_len)
        p = 0
        requestAnimationFrame(animate)
      }
    }

    canvas.addEventListener('mousemove', (e) => {
      mouse_x = e.offsetX
      animate()
    })

    drawPiano()
  }, [])

  return (
    <div>
      <h1>Piano</h1>
      <canvas ref={canvasRef} width={500} height={400} />
    </div>
  )
}

export default Piano
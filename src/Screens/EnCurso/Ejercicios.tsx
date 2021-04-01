export const html_ejercicios = (_id: string, codigos: string[]) => {
  switch (_id) {
    case "5f39fa442168a124bcdac8dc":
      return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
        </head>
        <body>
          ${codigos[0]}
          <script type="text/javascript">
            setTimeout(() => {
              const element = document.querySelector("div");
              if (element.textContent === "¡Hola mundo!") {
                console.log("¡Contiene hola mundo!");
              }
            }, 50);
          </script>
        </body>
      </html>
    `;
    case "5f961550d7ed8b87c34e133c":
      return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
        </head>
        <body>
          ${codigos[0]}
          <script type="text/javascript">
            setTimeout(() => {
              const element = document.querySelector("input");
              if (element.placeholder === "¡Escribe aquí!") {
                console.log("¡Contiene escribe aquí!");
              }
            }, 50);
          </script>
        </body>
      </html>
    `;
    case "5f9615aad7ed8b87c34e133d":
      return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <script type="text/javascript">
            setTimeout(() => {
              const element = document.querySelector(".color");
              const style = window.getComputedStyle(element);
              if (style.color === "rgb(0, 0, 255)") {
                console.log("¡Su color es azul!");
              }
            }, 50);
          </script>
        </head>
        <body>
          <style>
           ${codigos[0]}
          </style>
          ${codigos[1]}
        </body>
      </html>
    `;
    case "5f961656d7ed8b87c34e133f":
      return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <script type="text/javascript">
            ${codigos[0]}
            if (typeof miNombre === "string" && miNombre) {
              console.log("¡La variable es una cadena y no esta vacía");
            }
          </script>
        </head>
        <body>
        </body>
      </html>
    `;
    default:
      return "<div>Modifica este texto default</div>";
  }
};

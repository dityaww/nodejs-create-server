// const sayHello = "Hello";
// console.log(sayHello);

const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "NodeJS");

  res.statusCode = 200;

  const { method, url } = req;

  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "success",
        })
      );
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `cannot access! error ${method}`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "success",
        })
      );
    } else if (method === "POST") {
      let body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            datas: `Halo, ${name}! Ini adalah halaman about`,
          })
        );
      });
    } else {
      res.end(
        JSON.stringify({
          message: `cannot access! error ${method}`,
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: "Page not found!",
      })
    );
  }

  //   if (method === "GET") {
  //     res.end("success get");
  //   }

  //   if (method === "POST") {
  //     let body = [];

  //     req.on("data", (chunk) => {
  //       body.push(chunk);
  //     });

  //     req.on("end", () => {
  //       body = Buffer.concat(body).toString();
  //       const { name } = JSON.parse(body);
  //       res.end(`Hai, ${name}`);
  //     });
  //   }

  //   if (method === "PUT") {
  //     res.end("success put");
  //   }

  //   if (method === "DELETE") {
  //     res.end("success delete");
  //   }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});

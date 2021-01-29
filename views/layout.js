//NOTE THE LINK HREF IS /CSS/STYLE.CSS BECAUSE
//AFTER WE SET UP THE LINKING OF STYLES WUTH APP.USE('PUBLIC')
//THIS FILE KNOWS TO TREAT IT LOCALLY (BASICALLY HEEHEE FAG)
module.exports=({content})=>{
  return `<!DOCTYPE HTML PUBLIC
  "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd"> <html lang="en"> <head>
  <link rel='stylesheet' href='/css/style.css'>

  <meta http-equiv="content-type" content="text/html; charset=utf-8"> <title>Title Goes Here</title>
  </head>
  ${content}
  </body>
  </html>`
}

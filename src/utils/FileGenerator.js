const HTMLTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title$</title>
</head>
<body>$inner$</body>
$style$
</html>
`;

const StyleSheet = `
<style>
* {
    color: red;
}
</style>
`;


export default {
    download(fileName, content) {
        const aLink = document.createElement('a')
        const blob = new Blob([content])
        const evt = document.createEvent("HTMLEvents")
        evt.initEvent("click", true, true)
        aLink.download = fileName
        aLink.href = URL.createObjectURL(blob)
        aLink.dispatchEvent(evt)
        aLink.click()
    },
    generateHTML(inner, title) {
        return HTMLTemplate
            .replace("$inner$", inner)
            .replace("$title$", title === null ? "Rapoty-Gen" : title)
            .replace("$style$", StyleSheet)
    },
    style() {
        return StyleSheet
    }
}
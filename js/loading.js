export const toggleLoading = () => {
    alert("Load");
    const loadingBox = document.getElementById("loading-box");
    loadingBox.classList.toggle("hide");
}


function PostaviVrijednost(setter) {
    return function(event) {
      setter(event.target.value);
    };
}
export default PostaviVrijednost
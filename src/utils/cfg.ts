const cfg = {
    id: /id="[A-za-z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+"/g,
    idJunk: /\".*?\"/g,
    class: /class="[A-za-z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+"/g
};

export default cfg;
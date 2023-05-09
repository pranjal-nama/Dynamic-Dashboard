import './styles.css';

const options = ["Dashboard", "Email", "User", "Roles & Permissions", "Pages", "Raise Support", "Access Control", "Documentation", "Settings"];
export default function Navbar() {
    return (
        <div className='navbar-container'>
            <ul className='navbar'>
                {options.map((item, index) => {
                    return (
                        <Tile key={index} text={item} />
                    );
                })}
            </ul>
        </div>
    )
};

function Tile({ text }) {
    return (
        <li className="navbar-link">{text}</li>
    )
}


// export default Navbar;

/*
2 types of export in JS:
1. Named Exports (an object containing component(s) is exported)
2. Default Exports (a component is exported)

*/
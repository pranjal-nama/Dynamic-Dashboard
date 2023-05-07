import '../App.css';

const options = ["Dashboard", "Email", "User", "Roles & Permissions", "Pages", "Raise Support", "Access Control", "Documentation", "Settings"];
export default function Navbar() {
    return (
        <div className='sidenav'>
            <ul>
                {options.map((item, index) => {
                    return (
                        <Tile key={index} text={item} className="navbar-link" />
                    );
                })}
            </ul>
        </div>
    )
};

function Tile({ text, className }) {
    return (
        <li className={className}>{text}</li>
    )
}


// export default Navbar;

/*
2 types of export in JS:
1. Named Exports (an object containing component(s) is exported)
2. Default Exports (a component is exported)

*/
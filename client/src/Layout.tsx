import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <section className="container">
            <Outlet />
        </section>
    );
};

export default Layout;

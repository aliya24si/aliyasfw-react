export default function Container({ children }) {
    return (
        <div className="container">
            <h1>Portofolio Aliya</h1>
            <br />
            {children}
            <br />
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    );
}
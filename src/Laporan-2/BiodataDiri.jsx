export default function BiodataDiri() {
    return (
        <div>
            <Header />
            <Foto />
            <Tentang />
            <DataDiri />
            <Keahlian />
            <Kontak />
        </div>
    );
}

function Header() {
    return <h2>Aliya Safwa Shafira</h2>;
}

function Foto() {
    return <img src="/img/aliya safwa.jpg" alt="foto" width="120" />;
}

function Tentang() {
    return <p>Saya mahasiswa yang tertarik pada Web Development</p>;
}

function DataDiri() {
    return (
        <div>
            <p>Nama: Aliya Safwa Shafira</p>
            <p>Sistem Informasi</p>
        </div>
    );
}

function Keahlian() {
    return <p>Skill: HTML, CSS, React</p>;
}

function Kontak() {
    return <p>Email: aliya@email.com</p>;
}
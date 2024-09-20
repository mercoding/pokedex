export function getEnglishImprint() {
    return /*html*/`
        <section>
    <div id="imprintcontainer" class="imprintcontainer">
        <h1>Imprint</h1>
        <h2 id="m46">Service provider</h2>
        Martin Reifschneider
        Breite Schneise 9
        63674 Altenstadt
        Germany

        <h2 id="m56">Contact options</h2>
        <form id="my-form" action="https://formspree.io/f/xvoerbyy" method="POST">
            <input class="contactInput" placeholder="email" type="email" name="email" required />
            <textarea placeholder="message" type="text" name="message" required></textarea>
            <button id="my-form-button">Submit</button>
            <p id="my-form-status"></p>
        </form>
        <h2 id="m169">Photo credits</h2>
        <p>Image sources and copyright notices: </p>
        <p>Icons created by <a href="https://www.flaticon.com" target="_blank">https://www.flaticon.com</a></p>
        <p>Pictures created by <a href="https://pixabay.com" target="_blank">https://pixabay.com</a></p>

        <p class="seal"><a href="https://datenschutz-generator.de/"
                title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." target="_blank"
                rel="noopener noreferrer nofollow">Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas
                Schwenke</a></p>
    </div>
    <script>form.addEventListener("submit", handleSubmit);</script>
</section>
    `;
}
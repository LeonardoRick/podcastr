import styles from './styles.module.scss'

export function Player() {
    return (
        <div className={`${styles.player} w-96 h-screen py-12 px-16 bg-purple-600 text-white flex flex-col items-center justify-between`}>
            <header className="flex items-center gap-4">
                <img src="/img/playing.svg" alt="Tocando agora"/>
                <strong className="font-Lexend font-semibold">Tocando agora</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.noSelection}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/img/shuffle.svg" alt="embaralhar"/>
                    </button>
                    <button type="button">
                        <img src="img/play-previous.svg" alt="Tocar anterior"></img>
                    </button>
                    <button type="button" className="h-16 w-16 flex items-center justify-center rounded-2xl bg-purple-400">
                        <img src="/img/play.svg" alt="Tocar"/>
                    </button>
                    <button type="button">
                        <img src="/img/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button type="button">
                        <img src="/img/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}
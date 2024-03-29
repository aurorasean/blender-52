<script lang="ts">
    import CardHover from "$lib/Card.svelte";
    import { onMount } from "svelte";

    // get current week of the year
    const currentWeek = Math.ceil(
        (new Date().getTime() -
            new Date(new Date().getFullYear(), 0, 1).getTime()) /
            (7 * 24 * 60 * 60 * 1000),
    );
    const themes = [
        { week: 1, theme: "Dreams" },
        { week: 14, theme: "Futuristic " },
        { week: 27, theme: "Sci-Fi " },
        { week: 40, theme: "Anime" },
        { week: 2, theme: "Geek " },
        { week: 15, theme: "Video Games " },
        { week: 28, theme: "Hard Surface " },
        { week: 41, theme: "Loop" },
        { week: 3, theme: "Neon " },
        { week: 16, theme: "Lost " },
        { week: 29, theme: "Vortex " },
        { week: 42, theme: "Cubes" },
        { week: 4, theme: "Robots " },
        { week: 17, theme: "Launch " },
        { week: 30, theme: "Music " },
        { week: 43, theme: "Low Poly" },
        { week: 5, theme: "Splash " },
        { week: 18, theme: "Mechanical" },
        { week: 31, theme: "Float" },
        { week: 44, theme: "Dark" },
        { week: 6, theme: "Garden " },
        { week: 19, theme: "Organic " },
        { week: 32, theme: "Radiant " },
        { week: 45, theme: "Transport" },
        { week: 7, theme: "Asymmetry " },
        { week: 20, theme: "Speed " },
        { week: 33, theme: "Weapon " },
        { week: 46, theme: "Spin" },
        { week: 8, theme: "Symetry" },
        { week: 21, theme: "Tangled " },
        { week: 34, theme: "Fragment " },
        { week: 47, theme: "High" },
        { week: 9, theme: "Junk" },
        { week: 22, theme: "Isolation" },
        { week: 35, theme: "Abstract" },
        { week: 48, theme: "Imaginary" },
        { week: 10, theme: "Illusion " },
        { week: 23, theme: "Job" },
        { week: 36, theme: "Sculpting" },
        { week: 49, theme: "Danger" },
        { week: 11, theme: "Wide Angle" },
        { week: 24, theme: "Entrance " },
        { week: 37, theme: "Wild" },
        { week: 50, theme: "Digital" },
        { week: 12, theme: "Cosmic " },
        { week: 25, theme: "Empty Spaces" },
        { week: 38, theme: "Cold " },
        { week: 51, theme: "Power" },
        { week: 13, theme: "Horror " },
        { week: 26, theme: "Mirrors " },
        { week: 39, theme: "Beasts " },
        { week: 52, theme: "Shrink" },
    ]
        .map((x) => ({ ...x, active: x.week >= currentWeek }))
        .sort((a, b) => a.week - b.week);

    // @ts-ignore, it will be fine
    let elements: HTMLElement[] = themes.map((x) => undefined);

    onMount(() => {
        if (elements[currentWeek - 1]) {
            elements[currentWeek - 1].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    });
</script>

<div class="card-container">
    {#each themes as theme, index}
        <!-- content here -->

        <div class="card-size" bind:this={elements[index]}>
            <div style="margin: 2rem;">
                <CardHover
                    active={theme.active}
                    current={theme.week === currentWeek}
                >
                    <div class="card-content" data-active={theme.active}>
                        <h2 class="card-title">
                            W{theme.week} <br />
                            {theme.theme}
                        </h2>
                        <img
                            class="card-image"
                            alt={theme.theme}
                            src={`./images/${theme.week}.png`}
                        />
                    </div>
                </CardHover>
            </div>
        </div>
    {/each}
</div>

<style>
    .card-content {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
    }
    .card-content[data-active="false"] {
        opacity: 0.5;
    }
    .card-content[data-active="false"]:hover {
        opacity: 1;
    }
    .card-content:hover {
        color: aqua;
    }
    .card-image {
        width: 100%;
        display: block;
        border-radius: 0.2rem;
    }
    .card-container {
        display: flex;
        flex-wrap: wrap;
        display: inline-block;
    }
    .card-title {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
    }

    .card-image {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
    }

    .card-size {
        width: 20rem;
        padding: 0.5rem;
    }
</style>

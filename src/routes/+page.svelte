<script lang="ts">
    import CardHover from "$lib/Card.svelte";
    import { onMount } from "svelte";
    import { boolStore } from "$lib/store";
    import { data } from "$lib/data";

    // @ts-ignore
    import Carousel from "svelte-carousel";

    import { browser } from "$app/environment";

    let carousel: any;
    const handlePrevClick = () => {
        carousel.goToPrev();
    };
    const handleNextClick = () => {
        carousel.goToNext();
    };

    const currentWeek = Math.ceil(
        (new Date().getTime() -
            new Date(new Date().getFullYear(), 0, 1).getTime()) /
            (7 * 24 * 60 * 60 * 1000),
    );
    let currentSelectedYear = new Date().getFullYear().toString();

    boolStore.subscribe((value) => {
        if (value && carousel) {
            carousel.goTo(currentWeek - 1);
        }
    });
    const themes = data[currentSelectedYear]
        .map((x) => ({ ...x, active: x.week >= currentWeek }))
        .sort((a, b) => a.week - b.week);

    onMount(() => {
        setTimeout(() => {
            boolStore.set(true);
            setTimeout(() => {
                boolStore.set(false);
            }, 100);
        }, 100);
    });
</script>

<div>
    <div class="card-container">
        {#if browser}
            <div class="carousel2">
                <Carousel
                    bind:this={carousel}
                    let:showPrevPage
                    let:showNextPage
                >
                    <button slot="prev" on:click={handlePrevClick}>{"<"}</button
                    >
                    <button slot="next" on:click={handleNextClick}>{">"}</button
                    >
                    {#each themes as theme, index}
                        <div class="card-size">
                            <div style="margin: 2rem;">
                                <CardHover
                                    active={theme.active}
                                    current={theme.week === currentWeek}
                                >
                                    <div
                                        class="card-content"
                                        data-active={theme.active}
                                    >
                                        <h2 class="card-title">
                                            W{theme.week} <br />
                                            {theme.theme}
                                        </h2>
                                        <img
                                            class="card-image"
                                            alt={theme.theme}
                                            src={`./images/${currentSelectedYear}/${theme.week}.png`}
                                        />
                                    </div>
                                </CardHover>
                            </div>
                        </div>
                    {/each}
                </Carousel>
            </div>
        {/if}
    </div>
</div>

<style>
    button {
        background: hsl(221, 45%, 27%);
        color: hsl(222, 45%, 95%);
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        border: none;
        border-radius: 0.2rem;
        cursor: pointer;
    }
    @media (min-width: 730px) {
        .carousel2 {
            width: 80vw;
            max-width: 25rem;
        }
    }
    @media (min-width: 1024px) {
        .carousel2 {
            max-width: 25rem;
        }
    }
    @media (max-width: 730px) {
        .carousel2 {
            width: 95vw;
            max-width: 25rem;
        }
    }
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
        padding-top: 8rem;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>

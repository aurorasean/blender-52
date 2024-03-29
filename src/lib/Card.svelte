<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    let maxDeflection = 16;
    export let active = false;
    let element: HTMLElement;
    export let current = false;
    onMount(() => {
        element.addEventListener("mousemove", (e) => {
            rotateElement(e, element);
        });
    });
    onDestroy(() => {
        if (element)
            element.removeEventListener("mousemove", (e) => {
                rotateElement(e, element);
            });
    });

    function rotateElement(event: MouseEvent, element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const elementWidth = rect.width;
        const elementHeight = rect.height;

        const middleX = elementWidth / 2;
        const middleY = elementHeight / 2;

        const offsetX = ((x - middleX) / middleX) * maxDeflection;
        const offsetY = ((y - middleY) / middleY) * maxDeflection;

        const maxedX = Math.min(
            Math.max(offsetX, -maxDeflection),
            maxDeflection,
        );
        const maxedY = Math.min(
            Math.max(offsetY, -maxDeflection),
            maxDeflection,
        );
        // set rotation
        element.style.setProperty("--rotateX", maxedX + "deg");
        element.style.setProperty("--rotateY", -1 * maxedY + "deg");
    }
</script>

<pre bind:this={element} data-active={active} data-current={current}>
    <slot />
</pre>

<style lang="scss">
    :root {
        --pink: hsl(338, 70%, 55%);
        --teal: hsl(183, 70%, 62%);
        --white: hsl(334, 7%, 95%);
    }
    pre {
        --undefined: var(--white);
        color: var(--undefined);
        padding: 2rem;
        background-color: #000;
        border-radius: 0.5rem;
        position: relative;
        transform-style: preserve-3d;
        transition: 0.3s ease-out;
    }

    pre[data-current="true"] {
        background-color: #17b0b3;
    }
    pre:hover {
        transform: perspective(5000px) rotateY(var(--rotateX))
            rotateX(var(--rotateY));
    }

    @property --x {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }
    @property --y {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }
    pre::after {
        content: "";
        position: absolute;
        border-radius: inherit;
        z-index: -1;
        inset: -0.5rem;
        animation: colorChange 5s infinite alternate;

        background: radial-gradient(
                farthest-side at var(--x) var(--y),
                red,
                transparent
            ),
            radial-gradient(
                farthest-corner at calc(100% - var(--x)) var(--y),
                blue,
                transparent 400px
            ),
            radial-gradient(
                farthest-corner at calc(100% - var(--x)) calc(100% - var(--y)),
                rgb(0, 246, 0),
                transparent 400px
            );
        transform: translateZ(-25px);
    }
    @keyframes colorChange {
        0% {
            --x: 0%;
            --y: 0%;
        }
        50% {
            --x: 50%;
            --y: 50%;
        }
        100% {
            --x: 100%;
            --y: 100%;
        }
    }
</style>

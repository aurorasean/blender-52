<script lang="ts">
</script>

<div class="top-app-bar-container mdc-typography--body1">
    <div class="pinned center">
        <h1 class="title">Blender 52 Inspiration</h1>
        <div class="code">
            <h2>Be inspired!</h2>
            <p>
                Visit <a target="_blank" href="http://blender52.com/"
                    >blender52</a
                > to read what it is about
            </p>
        </div>
    </div>

    <slot />
</div>

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title {
        font-size: 2rem;
        margin: 0;
    }
    .code {
        background: hsl(222, 45%, 7%);
        color: hsl(222, 45%, 95%);
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .title > h1 {
    }
    .top-app-bar-container {
        width: 100%;
        margin-right: auto;
        max-width: 1200px;
        margin: auto;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>


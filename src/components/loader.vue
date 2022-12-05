<template>
    <div class="loader">
        <div class="loader__inside">

        </div>
        <div class="loader__message">
            در حال بارگزاری . . . 
        </div>
    </div>
</template>

<style lang="scss">
    .loader {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__inside {
            width: 200px;
            height: 200px;
            margin: 5rem 0 ;

            border-radius: 100%;
            border: 14px solid var(--color-grey-4);
            border-top: 14px solid var(--color-dark-2);
            animation: spin 1.4s linear infinite;
        }

        &__message {
            width: 100%;
            font-size: 1.6rem;
            text-align: center;
            color: var(--color-dark-2);
        }


    }

    @keyframes spin {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }
</style>


<? $title = 'Home'; require_once '../components/layout.php' ?>

<main class="container">
    <h1 class="mb-5"><? echo $title ?></h1>
    <div class="row row-cols-auto">
        <? require_once '../components/loading.php'; ?>
    </div>
</main>
    <? require_once '../components/footer.php' ?>
</body>
</html>
<? $title = 'Create post'; require_once '../../components/layout.php' ?>

<main class="container">
    <h1 class="mb-5"><? echo $title ?></h1>
    <form id="create-post">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" name="text" id="text" style="height: 100px"></textarea>
                <label for="text">Text</label>
            </div>
        </div>
        <div class="mb-3">
            <label for="img" class="form-label">Upload image</label>
            <input class="form-control" name="img" type="file" id="img">
        </div>
        <button type="submit" class="btn btn-success">Create</button>
    </form>
</main>
    <? require_once '../../components/footer.php' ?>
</body>
</html>
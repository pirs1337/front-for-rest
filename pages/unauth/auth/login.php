<? $title = 'Login'; require_once '../../components/layout.php' ?>

<main class="container">
    <h1 class="mb-5"><? echo $title ?></h1>
    <form id="login-form">
        <div class="mb-3">
            <label for="login" class="form-label">Login</label>
            <input type="text" class="form-control" name="login" id="login">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" id="password">
        </div>
        <button type="submit" class="btn btn-primary"><? echo $title ?></button>
        <span><a href="./register.php">No account?</a></span>
    </form>
</main>

<? require_once '../../components/footer.php' ?>
</body>
</html>
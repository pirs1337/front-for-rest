<? $title = 'Register'; require_once '../../components/layout.php' ?>

<main class="container">
    <h1 class="mb-5"><? echo $title ?></h1>
    <form id="register-form">
        <div class="mb-3">
            <label for="login" class="form-label">Login</label>
            <input type="text" class="form-control" name="login" id="login">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email adress</label>
            <input type="email" class="form-control" name="email" id="email">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password Confirmation</label>
            <input type="password" class="form-control" name="password_confirmation" id="password_confirmation">
        </div>
        <div class="mb-3">
            <label for="avatar" class="form-label">Upload avatar</label>
            <input class="form-control" name="avatar" type="file" id="avatar">
        </div>
        <button type="submit" class="btn btn-primary"><? echo $title ?></button>
        <span><a href="./login.php">Have an account?</a></span>
    </form>
</main>

<? require_once '../../components/footer.php' ?>
</body>
</html>
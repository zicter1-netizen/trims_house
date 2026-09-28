<?php
session_start();
$user = $_SESSION['user'] ?? null;
$page = file_get_contents(__DIR__ . '/index.html');
$initialUser = '<script>window.INITIAL_USER = ' . json_encode($user) . ';</script>';
$page = str_replace('<script>window.INITIAL_USER = null;</script>', $initialUser, $page);
echo $page;

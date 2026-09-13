# Panduan Rilis Google Play Store & TWA Alkitab Digital

Dokumen ini berisi seluruh konfigurasi, kredensial keystore, dan instruksi untuk mem-build file **.aab** (Android App Bundle) dan **.apk** untuk rilis di Google Play Store.

---

## 1. Ringkasan Identitas Aplikasi & Kunci Rilis

| Properti | Nilai |
| :--- | :--- |
| **Nama Aplikasi** | Alkitab Digital |
| **Package Name** | `com.alkitab.digital` |
| **URL TWA** | `https://bible-hsgjshsjjshsh.pages.dev` |
| **Version Code** | `1` *(Tingkatkan +1 setiap rilis pembaruan: 2, 3, 4...)* |
| **Version Name** | `1.0.0` *(Gunakan SemVer: 1.0.1, 1.1.0, 2.0.0...)* |
| **Nama File Keystore** | `release.keystore` |
| **Key Alias** | `androidreleasekey` |
| **Keystore Password** | `alkitabdigital123` |
| **Key Password** | `alkitabdigital123` |
| **Masa Berlaku Kunci** | 10.000 hari (~27 tahun) |
| **SHA-256 Fingerprint** | `3F:33:EC:CB:DB:9F:8D:9E:2B:F9:88:58:8E:09:39:09:A3:FC:81:F2:2F:7F:CF:46:6D:5A:C4:7B:C7:D4:0C:A0` |

> ⚠️ **PENTING:** Simpan file `release.keystore` dan salinan `release.keystore.base64` di tempat yang aman. Kunci ini adalah tanda tangan resmi aplikasi Anda di Google Play Store. Jika hilang, Anda tidak dapat mengupdate aplikasi dengan package name yang sama kecuali jika mengaktifkan Google Play App Signing.

---

## 2. Verifikasi Domain TWA (Digital Asset Links)

Untuk memastikan aplikasi terbuka secara layar penuh tanpa bilah browser (*Address Bar Chrome*), file verifikasi telah ditempatkan di:
- Lokasi di proyek: `public/.well-known/assetlinks.json`
- URL Publik: `https://bible-hsgjshsjjshsh.pages.dev/.well-known/assetlinks.json`

Isi file `assetlinks.json`:
```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "com.alkitab.digital",
      "sha256_cert_fingerprints": [
        "3F:33:EC:CB:DB:9F:8D:9E:2B:F9:88:58:8E:09:39:09:A3:FC:81:F2:2F:7F:CF:46:6D:5A:C4:7B:C7:D4:0C:A0"
      ]
    }
  }
]
```

---

## 3. Cara Menjalankan Build di GitHub Actions

Workflow build telah disiapkan di `.github/workflows/build-twa.yml`.

### Langkah Menjalankan:
1. Push kode proyek ke repositori GitHub Anda.
2. Buka tab **Actions** di repositori GitHub Anda.
3. Pilih workflow **"Build Android TWA (AAB & APK)"** di sidebar kiri.
4. Klik tombol **"Run workflow"**:
   - Anda dapat mengosongkannya untuk menggunakan versi default (`versionCode: 1`, `versionName: 1.0.0`).
   - Atau masukkan nomor versi baru jika ingin melakukan update rilis (misal: `version_code: 2`, `version_name: 1.0.1`).
5. Tunggu proses build selesai (~2-4 menit).
6. Di bagian bawah ringkasan build (*Artifacts*), unduh file zip **`alkitab-digital-android-release`**.
7. Ekstrak zip tersebut untuk mendapatkan:
   - **`*.aab`** *(Android App Bundle)* ➔ Upload file ini ke **Google Play Console**.
   - **`*.apk`** ➔ Dapat diinstal langsung di HP Android untuk testing.

---

## 4. Cara Melakukan Update Aplikasi di Masa Depan

Ketika Anda ingin memperbarui aplikasi di Google Play Store:
1. Buka file `twa-manifest.json` di proyek Anda.
2. Ubah `appVersionCode` bertambah 1:
   ```json
   "appVersionCode": 2
   ```
3. Ubah `appVersionName` ke versi baru:
   ```json
   "appVersionName": "1.0.1"
   ```
4. Commit dan push ke GitHub (atau jalankan langsung via tombol *Run workflow* dengan mengisi input versi baru).
5. File `.aab` baru akan otomatis ter-generate dan siap diunggah ke Google Play Console pada menu **Production / Internal testing &gt; Create new release**.

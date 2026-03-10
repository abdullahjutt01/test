$nouns = @(
    "Smartphone", "Laptop", "Monitor", "Headphones", "Speaker", "Camera", "Tablet", "Smartwatch",
    "Jacket", "Sneakers", "T-Shirt", "Jeans", "Watch", "Sunglasses", "Handbag", "Dress",
    "Blender", "Coffee Maker", "Vacuum", "Air Fryer", "Sofa", "Desk", "Lamp", "Rug",
    "Lipstick", "Foundation", "Moisturizer", "Serum", "Perfume", "Shampoo", "Cleanser", "Mascara",
    "Protein Powder", "Yoga Mat", "Treadmill", "Vitamins", "Dumbbells", "Foam Roller", "Blood Pressure Monitor",
    "Action Figure", "Board Game", "Building Blocks", "Stroller", "Diapers", "Plush Toy", "Puzzle",
    "Coffee Beans", "Olive Oil", "Pasta", "Chocolate", "Tea", "Honey", "Almonds", "Cereal",
    "Tent", "Bike Helmet", "Dog Food", "Car Wash Kit", "Dash Cam", "Fishing Rod", "Drill", "Guitar",
    "Software", "Course Bundle", "Subscription", "eBook", "App License", "Template Pack", "Antivirus"
)

$outDir = "e:\New folder (2)\frontend\images"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

$wc = New-Object System.Net.WebClient
foreach ($n in $nouns) {
    $safeName = $n.Replace(' ', '_').ToLower()
    $file = "$outDir\$safeName.jpg"
    if (!(Test-Path $file)) {
        try {
            $url = "https://tse2.mm.bing.net/th?q=$($n -replace ' ', '+')+product+high+quality"
            $wc.DownloadFile($url, $file)
            Write-Host "Downloaded $n"
        }
        catch {
            Write-Host "Failed $n : $($_.Exception.Message)"
        }
    }
    else {
        Write-Host "Exists $n"
    }
}
$wc.Dispose()
Write-Host "Done downloading all images."

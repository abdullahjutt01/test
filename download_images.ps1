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
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$jobs = @()
foreach ($n in $nouns) {
    $scriptBlock = {
        param($n, $outDir)
        $safeName = $n.Replace(' ', '_').ToLower()
        $file = "$outDir\$safeName.jpg"
        if (!(Test-Path $file)) {
            $url = "https://tse2.mm.bing.net/th?q=$($n -replace ' ', '+')+product+high+quality"
            try {
                Invoke-WebRequest -Uri $url -OutFile $file
                return "Downloaded $n"
            } catch {
                return "Failed $n"
            }
        } else {
            return "Exists $n"
        }
    }
    $jobs += Start-Job -ScriptBlock $scriptBlock -ArgumentList $n, $outDir
}

$results = Receive-Job -Job $jobs -Wait -AutoRemoveJob -ErrorAction SilentlyContinue
Write-Output $results

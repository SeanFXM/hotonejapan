"use client"

import type React from "react"

import { Mail, Info, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlogSlider } from "@/components/blog-slider"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    inquiryType: "",
    brand: "",
    productName: "",
    serialNumber: "",
    inquiryContent: "",
    computerManufacturer: "",
    computerModel: "",
    cpu: "",
    memory: "",
    os: "",
    dawSoftware: "",
    softwareVersion: "",
    connectingType: "",
    name: "",
    nameReading: "",
    email: "",
    emailConfirm: "",
    age: "",
    occupation: "",
    howDidYouKnow: "",
    currentEquipment: "",
    futureEquipment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 年末年始期間中の対応について */}
        <div className="bg-red-50 border-b-4 border-red-500 py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-l-4 border-red-500 p-6 shadow-md">
                <h3 className="text-lg font-bold text-red-700 mb-3">【重要】年末年始期間中の対応について</h3>
                <div className="space-y-2 text-gray-800">
                  <p className="leading-relaxed">
                    年末年始の影響により、お問い合わせ・修理対応は <span className="font-bold text-red-600">1月6日以降</span> の対応となります。
                  </p>
                  <p className="leading-relaxed">
                    緊急のご用件につきましては、<a href="mailto:info@hotone.jp" className="text-blue-600 hover:text-blue-800 underline font-medium">info@hotone.jp</a> まで直接お問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">お問い合わせ</h1>
                </div>
              </div>

              <div className="hidden lg:flex justify-end">
                <div className="relative w-full max-w-2xl h-[280px]">
                  <Image
                    src="/images/hero-products.jpg"
                    alt="Music Equipment Collection"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 bg-white border-l-4 border-blue-500 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-xl font-bold text-gray-900">お問い合わせフォーム</h2>
                    <div className="space-y-2 text-gray-700">
                      <p className="leading-relaxed">お問い合わせには順次、メールにてご返答させていただきます。</p>
                      <p className="leading-relaxed">
                        お問い合わせの内容や混雑状況によっては回答にお時間をいただく場合がございます。予めご了承ください。
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                        （迷惑メールに仕分けられないよう、@hotone.jpからのメールを受け取れるようにしてください）
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold">修理に関するお問い合わせは専用ページへ</span>
                      <span className="mx-2">|</span>
                      <Button
                        asChild
                        variant="link"
                        className="h-auto p-0 text-sm text-amber-700 hover:text-amber-800 underline font-medium"
                      >
                        <a href="/support/repair">修理ページを見る</a>
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 md:p-12 space-y-12">
                {/* サポート・お問い合わせの種類 */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-sm">📋</span>
                    サポート・お問い合わせの種類
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      お問い合わせの内容
                      <span className="text-sm text-gray-500">Please Your Inquiry</span>
                    </Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="リストから選んでください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-purchase">ご購入前のお問い合わせ</SelectItem>
                        <SelectItem value="usage">使用方法に関するお問い合わせ</SelectItem>
                        <SelectItem value="other">その他のお問い合わせ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 製品に関する情報 */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-sm">📋</span>
                    製品に関する情報
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="brand" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      ブランド
                      <span className="text-sm text-gray-500">Brand</span>
                    </Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(value) => setFormData({ ...formData, brand: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ブランドを選んでください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotone">Hotone</SelectItem>
                        <SelectItem value="valeton">Valeton</SelectItem>
                        <SelectItem value="audient">Audient</SelectItem>
                        <SelectItem value="musiconlab">MusiconLab</SelectItem>
                        <SelectItem value="strymon">Strymon</SelectItem>
                        <SelectItem value="klowra">Klowra</SelectItem>
                        <SelectItem value="sonicake">Sonicake</SelectItem>
                        <SelectItem value="divitone">Divitone</SelectItem>
                        <SelectItem value="soundmaker">Soundmaker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productName" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      製品名・型番
                      <span className="text-sm text-gray-500">Model Name</span>
                    </Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumber" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      シリアルナンバー
                      <span className="text-sm text-gray-500">Serial Number</span>
                    </Label>
                    <Input
                      id="serialNumber"
                      placeholder="こちら購入の証明書は"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryContent" className="flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      お問い合わせの内容
                      <span className="text-sm text-gray-500">Details</span>
                    </Label>
                    <Textarea
                      id="inquiryContent"
                      placeholder="お問い合わせの内容を詳しくご記入ください"
                      rows={6}
                      value={formData.inquiryContent}
                      onChange={(e) => setFormData({ ...formData, inquiryContent: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachment" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      添付ファイル
                      <span className="text-sm text-gray-500">Attachment File</span>
                    </Label>
                    <Input id="attachment" type="file" accept=".gif,.png,.jpg,.zip,.pdf,.doc,.xls,.xlsx" />
                    <p className="text-xs text-gray-500">
                      添付ファイルがある場合は添付してください
                      <br />
                      対応ファイル形式：.gif, .png, .gif, .zip, .pdf, .doc, .xls, .xlsx
                    </p>
                  </div>
                </div>

                {/* コンピューター等の使用環境 */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                      <span className="text-sm">📋</span>
                      コンピューター等の使用環境
                    </h2>
                    <p className="text-sm text-gray-600">
                      コンピューター等関連する使用環境についてのお問い合わせの場合、詳しくご記入ください。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="computerManufacturer" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        コンピューターのメーカー
                        <span className="text-sm text-gray-500">Computer Manufacturer</span>
                      </Label>
                      <Input
                        id="computerManufacturer"
                        value={formData.computerManufacturer}
                        onChange={(e) => setFormData({ ...formData, computerManufacturer: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="computerModel" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        コンピューターの種類
                        <span className="text-sm text-gray-500">Computer Model</span>
                      </Label>
                      <Input
                        id="computerModel"
                        value={formData.computerModel}
                        onChange={(e) => setFormData({ ...formData, computerModel: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpu" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        CPU
                      </Label>
                      <Input
                        id="cpu"
                        value={formData.cpu}
                        onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="memory" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        メモリ
                        <span className="text-sm text-gray-500">Memory</span>
                      </Label>
                      <Input
                        id="memory"
                        value={formData.memory}
                        onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="os" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        OS
                      </Label>
                      <Input
                        id="os"
                        value={formData.os}
                        onChange={(e) => setFormData({ ...formData, os: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dawSoftware" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        DAWソフト
                        <span className="text-sm text-gray-500">DAW Software</span>
                      </Label>
                      <Input
                        id="dawSoftware"
                        value={formData.dawSoftware}
                        onChange={(e) => setFormData({ ...formData, dawSoftware: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="softwareVersion" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        ソフトのバージョン
                        <span className="text-sm text-gray-500">Software Version</span>
                      </Label>
                      <Input
                        id="softwareVersion"
                        value={formData.softwareVersion}
                        onChange={(e) => setFormData({ ...formData, softwareVersion: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="connectingType" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        コンピューターとの接続方法
                        <span className="text-sm text-gray-500">Connecting Type</span>
                      </Label>
                      <Input
                        id="connectingType"
                        value={formData.connectingType}
                        onChange={(e) => setFormData({ ...formData, connectingType: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* お客様の情報 */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-sm">📋</span>
                    お客様の情報
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        お名前
                        <span className="text-sm text-gray-500">Your Name</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameReading" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        ふりがな
                        <span className="text-sm text-gray-500">Name Reading</span>
                      </Label>
                      <Input
                        id="nameReading"
                        value={formData.nameReading}
                        onChange={(e) => setFormData({ ...formData, nameReading: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        メールアドレス
                        <span className="text-sm text-gray-500">Mail Address</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailConfirm" className="flex items-center gap-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        メールアドレス（確認用）
                        <span className="text-sm text-gray-500">Mail Address Confirm</span>
                      </Label>
                      <Input
                        id="emailConfirm"
                        type="email"
                        value={formData.emailConfirm}
                        onChange={(e) => setFormData({ ...formData, emailConfirm: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* よろしければ、アンケートにご協力お願いします */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-sm">📋</span>
                    よろしければ、アンケートにご協力お願いします
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        ご年齢
                        <span className="text-sm text-gray-500">Your Age</span>
                      </Label>
                      <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="20歳未満" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under20">20歳未満</SelectItem>
                          <SelectItem value="20-29">20-29歳</SelectItem>
                          <SelectItem value="30-39">30-39歳</SelectItem>
                          <SelectItem value="40-49">40-49歳</SelectItem>
                          <SelectItem value="50-59">50-59歳</SelectItem>
                          <SelectItem value="60+">60歳以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                        ご職業
                        <span className="text-sm text-gray-500">Your Occupation</span>
                      </Label>
                      <Select
                        value={formData.occupation}
                        onValueChange={(value) => setFormData({ ...formData, occupation: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="学生" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">学生</SelectItem>
                          <SelectItem value="office-worker">社会人（一般職）</SelectItem>
                          <SelectItem value="self-employed">自営業</SelectItem>
                          <SelectItem value="music-production">音楽制作・ミュージシャン</SelectItem>
                          <SelectItem value="recording">音響関連・レコーディング</SelectItem>
                          <SelectItem value="pa">音響関連・PA関連</SelectItem>
                          <SelectItem value="video-production">音響関連・映像制作</SelectItem>
                          <SelectItem value="creative">その他クリエイティブ</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howDidYouKnow" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      どのようにして製品を知りましたか？
                      <span className="text-sm text-gray-500">How did you find out about this product?</span>
                    </Label>
                    <Textarea
                      id="howDidYouKnow"
                      rows={4}
                      value={formData.howDidYouKnow}
                      onChange={(e) => setFormData({ ...formData, howDidYouKnow: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentEquipment" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      現在、どのような機材をお使いですか？
                      <span className="text-sm text-gray-500">Currently, do you use any kind of equipment?</span>
                    </Label>
                    <Textarea
                      id="currentEquipment"
                      rows={4}
                      value={formData.currentEquipment}
                      onChange={(e) => setFormData({ ...formData, currentEquipment: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="futureEquipment" className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">必須</span>
                      今後、購入したい機材は何ですか？
                      <span className="text-sm text-gray-500">
                        In the future, What are the equipment you want to buy?
                      </span>
                    </Label>
                    <Textarea
                      id="futureEquipment"
                      rows={4}
                      value={formData.futureEquipment}
                      onChange={(e) => setFormData({ ...formData, futureEquipment: e.target.value })}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-lg"
                  >
                    送信する
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Blog Slider */}
        <BlogSlider />
      </main>
    </div>
  )
}

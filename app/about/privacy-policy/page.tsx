import { Shield } from "lucide-react"
import Image from "next/image"
import { BlogSlider } from "@/components/blog-slider"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="bg-[#161616] text-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">プライバシーポリシー</h1>
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 p-8 md:p-12 space-y-8">
                {/* 更新日期 */}
                <div className="text-sm text-gray-600">最終更新日：2025年4月7日</div>

                {/* 引言 */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    本プライバシーポリシーでは、HOT MUSIC お客様がhotmusic.jp (以下「サイト」)
                    にアクセスしたり、当社のサービスを利用したり、サイトで購入したりする場合、あるいはサイトに関して当社と連絡を取る場合
                    (以下総称して「サービス」) に、当サイト (以下「サイト」、「当社」、または「弊社」)
                    がお客様の個人情報をどのように収集、使用、開示するのかを説明します。本プライバシーポリシーの目的上、「お客様」および「お客様の」とは、お客様、ウェブサイト訪問者、またはその他に本プライバシーポリシーに従って当社が情報を収集した人物であるかどうかにかかわらず、本サービスのユーザーに当たる方を意味します。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    本プライバシーポリシーは細部までよくお読みください。いずれかのサービスを使用およびアクセスすることにより、本プライバシーポリシーに記載されているとおり、お客様の情報の収集、使用、開示にお客様は同意したものとみなされます。本プライバシーポリシーに同意しない場合は、いかなるサービスも使用またはアクセスしないでください。
                  </p>
                </div>

                {/* 本プライバシーポリシーの変更 */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">本プライバシーポリシーの変更</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、当社のプライバシー慣行の変更を反映するため、またはその他の運用上、法律上、または規制上の理由により、このプライバシーポリシーを随時更新する場合があります。当社は、改訂されたプライバシーポリシーをサイトに掲載し、「最終更新日」を更新し、適用法で要求されるその他の措置を講じます。
                  </p>
                </div>

                {/* 個人情報の収集と使用方法 */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">個人情報の収集と使用方法</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、サービスを提供するため、以下に定めるように、さまざまな情報源からお客様の個人情報を収集してきました。当社が収集し使用する情報は、お客様と当社とのやり取り方法によって異なります。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    以下に記載する特定の使用に加えて、当社は、お客様とのコミュニケーション、サービスの提供または改善、適用される法的義務の遵守、適用される利用規約の執行、およびサービス、当社の権利、およびユーザーまたはその他の権利の保護または擁護のために、お客様について収集した情報を使用する場合があります。
                  </p>
                </div>

                {/* 当社が収集する個人情報 */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">当社が収集する個人情報</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社がお客様に関して取得する個人情報の種類は、お客様が当社サイトをどのように利用し、当社サービスを利用するかによって異なります。当社が「個人情報」という用語を使用する場合、お客様を識別、関連、説明、または関連付けることができる情報を指します。以下のセクションでは、当社が収集する個人情報のカテゴリと具体的な種類について説明します。
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6">お客様から直接収集する情報</h3>
                  <p className="text-gray-700 leading-relaxed">
                    当社のサービスを通じてお客様が当社に直接送信する情報には、以下が含まれる場合があります。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>連絡先情報には、お名前、住所、電話番号、電子メールなどが含まれます。</li>
                    <li>
                      注文情報には、お名前、請求先住所、配送先住所、決済確認、メールアドレス、電話番号などが含まれます。
                    </li>
                    <li>
                      アカウント情報には、ユーザー名、パスワード、セキュリティの質問、アカウントのセキュリティ目的で使用されるその他の情報がなどが含まれます。
                    </li>
                    <li>
                      カスタマーサポート情報には、たとえば、サービスを通じてメッセージを送信する場合など、当社との通信に含めることを選択した情報も含まれます。
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    本サービスの一部の機能では、お客様ご自身に関する特定の情報を当社に直接提供していただく必要がある場合があります。この情報を提供しないことも選択できますが、その場合、これらの機能を使用またはアクセスできなくなる可能性があります。
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6">お客様の使用状況に関して当社が収集する情報</h3>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、お客様の本サービスとのやり取りに関する特定の情報 (以下「使用データ」)
                    を自動的に収集する場合もあります。そのため、Cookie、ピクセル、および同様のテクノロジー
                    (以下「Cookies」)
                    を使用する場合があります。使用データには、デバイス情報、ブラウザ情報、ネットワーク接続に関する情報、IP
                    アドレス、サービスとのやり取りに関するその他の情報など、お客様が当社のサイトおよびお客様のアカウントにアクセスし使用する方法に関する情報が含まれる場合があります。
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-6">第三者から取得する情報</h3>
                  <p className="text-gray-700 leading-relaxed">
                    最後に、当社は、当社に代わって情報を収集する販売元やサービスプロバイダーなど、外部サービスからお客様に関する情報を取得する場合があります。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Shopify など、当社のサイトおよびサービスをサポートする企業。</li>
                    <li>
                      当社の決済処理サービスは、お客様との契約を履行するために、お客様の注文をのフルフィルメントし、お客様が要求した製品またはサービスを提供するために、決済情報
                      (銀行口座、クレジットカードまたはデビットカード情報、請求先住所など) を収集します。
                    </li>
                    <li>
                      お客様が当社のサイトにアクセスしたり、当社から送信された電子メールを開いたりクリックしたり、当社のサービスや広告を利用したりする場合、当社または当社と提携する外部サービスは、ピクセル、ウェブビーコン、ソフトウェア開発キット、外部サービスのライブラリ、Cookieなどのオンライン追跡技術を使用して特定の情報を自動的に収集する場合があります。
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    当社が第三者から取得した情報はすべて、本プライバシーポリシーに従って取り扱われます。以下の「外部サービスのウェブサイトとリンク」セクションも参照してください。
                  </p>
                </div>

                {/* 個人情報の利用目的 */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">個人情報の利用目的</h2>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">製品およびサービスの提供</h3>
                    <p className="text-gray-700 leading-relaxed">
                      当社は、決済処理、注文のフルフィルメント、お客様のアカウントや購入ならびに返品と交換またはその他の取引に関連する通知の送信、アカウントの作成、維持、その他の管理、配送の手配、返品と交換やその他のお客様のアカウント関連の事柄や機能の円滑な処理など、お客様との契約をフルフィルメントするために、お客様の個人情報を使用してサービスを提供しています。また、Shopify
                      がお客様のアカウントをお客様が選択した他の Shopify
                      サービスと照合できるようにすることで、ショッピング体験を向上させることもできます。この場合、Shopifyはプライバシーポリシーおよび消費者プライバシーポリシーに従ってお客様の情報を処理します。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">マーケティングや広告</h3>
                    <p className="text-gray-700 leading-relaxed">
                      当社は、マーケティング、広告、プロモーションの通信を電子メール、テキスト
                      メッセージ、または郵便で送信したり、製品やサービスの広告を表示したりするなど、マーケティングおよびプロモーションの目的でお客様の個人情報を使用する場合があります。これには、当サイトや他のウェブサイト上でのサービスや広告をより良くカスタマイズするために、お客様の個人情報を使用することが含まれる場合があります。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">セキュリティと詐欺防止</h3>
                    <p className="text-gray-700 leading-relaxed">
                      当社は、詐欺、違法、または悪意のある可能性のある行為を検出、調査、または措置を講じるためにお客様の個人情報を使用します。本サービスを使用してアカウントを登録することを選択した場合、アカウントの認証情報を安全に保つ責任はお客様にあります。ユーザー名、パスワード、その他のアクセス詳細を他の人と共有しないことを強くお勧めします。アカウントが侵害されたと思われる場合は、すぐにご連絡ください。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      お客様とのコミュニケーションとサービスの改善
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      当社は、お客様にカスタマーサポートを提供し、当社のサービスを向上させるためにお客様の個人情報を使用します。これは、お客様への対応、効果的なサービスの提供、お客様とのビジネス関係の維持のために当社が正当な利益を得るためです。
                    </p>
                  </div>
                </div>

                {/* Cookie */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">Cookie</h2>
                  <p className="text-gray-700 leading-relaxed">
                    多くのウェブサイトと同様に、当社サイトでも Cookie
                    を使用しています。Shopifyでストアを運営するために使用するCookieに関する具体的な情報については、https://www.shopify.com/legal/cookiesをご覧ください。当社は、当社のサイトおよびサービスを強化および改善するため
                    (お客様の行動や好みを記憶することを含む)
                    、分析を実行し、サービスに対するユーザーのインタラクションをよりよく理解するため
                    (サービスを管理、改善、最適化するという当社の正当な利益のため) に Cookie
                    を使用します。また、当社では、当社サイトおよび他のウェブサイト上のサービス、製品、広告をより適切にカスタマイズするために、第三者およびサービスプロバイダーが当社サイトで
                    Cookie を使用することを許可する場合があります。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ほとんどのブラウザはデフォルトで自動的に Cookie を受け入れますが、ブラウザのコントロールを使用して
                    Cookie を削除または拒否するようにブラウザを設定することもできます。Cookie
                    を削除またはブロックすると、ユーザー
                    エクスペリエンスに悪影響が及ぶ可能性があり、特定の機能や一般的な機能を含む一部のサービスが正しく動作しなくなったり、利用できなくなったりする可能性があることにご注意ください。さらに、Cookie
                    をブロックしても、広告パートナーなどの外部サービスとの情報共有を完全に防止できない場合があります。
                  </p>
                </div>

                {/* 個人情報の開示方法 */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">個人情報の開示方法</h2>
                  <p className="text-gray-700 leading-relaxed">
                    特定の状況において、当社は、契約履行目的、正当な目的、および本プライバシーポリシーに従うその他の理由により、お客様の個人情報を外部サービスに開示することがあります。このような状況には次のようなものが含まれます。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>
                      当社に代わってサービス (IT 管理、決済処理、データ分析、顧客サポート、クラウド
                      ストレージ、フルフィルメント、配送など) を実行する販売元またはその他の外部サービス。
                    </li>
                    <li>
                      ビジネスおよびマーケティングパートナーとお客様にサービスを提供したり、広告を配信したりするためです。当社のビジネスおよびマーケティング
                      パートナーは、各社のプライバシー通知に従ってお客様の情報を使用します。
                    </li>
                    <li>
                      お客様が当社に指示、要請、またはその他の方法で特定の情報を外部サービスに開示することに同意した場合
                      (お客様の同意を得て、製品を発送する場合、またはお客様のソーシャル メディア
                      ウィジェットやログイン統合を使用する場合など) 。
                    </li>
                    <li>当社の正当な利益のため、当社の関連会社または当社グループ内の他の会社と協力します。</li>
                    <li>
                      合併や破産などのビジネス取引に関連して、適用される法的義務を遵守するため
                      (召喚状、捜索令状、および同様の要求に応じることを含む)
                      、適用される利用規約を施行するため、およびサービス、当社の権利、および当社のユーザーまたは他者の権利を保護または防御するため。
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    当社は、上記の「個人情報の収集および使用方法」および「個人情報の開示方法」に記載されている目的のために、ユーザーに関する以下のカテゴリーの個人情報および機密性の高い個人情報を開示します：
                  </p>

                  {/* テーブル */}
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            カテゴリー
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            受信者のカテゴリ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            基本的な連絡先の詳細や特定の注文およびアカウント情報などの識別子
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700" rowSpan={4}>
                            当社に代わってサービスを提供する販売元および外部サービス
                            (インターネットサービスプロバイダー、決済処理サービス、フルフィルメントパートナー、顧客サポートパートナー、データ分析プロバイダーなど)
                            <br />
                            <br />
                            ビジネスおよびマーケティングパートナー
                            <br />
                            <br />
                            アフィリエイト
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            注文情報、ショッピング情報、顧客サポート情報などの商業情報
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            インターネットまたはその他の類似のネットワークアクティビティ (使用状況データなど)
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            IPアドレスやその他の技術的手段によって特定された位置情報などの地理位置情報データ
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-700 leading-relaxed mt-4">
                    当社は、お客様の同意なしに、またはお客様に関する特性を推測する目的で、機密性の高い個人情報を使用または開示することはありません。
                  </p>
                </div>

                {/* 外部サービスのウェブサイトとリンク */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">外部サービスのウェブサイトとリンク</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当サイトは、外部サービスが運営するウェブサイトやその他のオンラインプラットフォームへのリンクを提供する場合があります。当社と提携または管理関係にないサイトへのリンクをたどる場合は、そのサイトのプライバシーおよびセキュリティ
                    ポリシー、その他の利用規約を確認してください。当社は、これらのサイトに掲載されている情報の正確性、完全性、信頼性を含め、これらのサイトのプライバシーやセキュリティについて保証するものではなく、責任を負いません。お客様が公的または半公的の場で提供する情報
                    (外部サービスのソーシャル ネットワーキング プラットフォームで共有する情報を含む)
                    は、当社または外部サービスによる使用に制限なく、本サービスの他のユーザーおよび/または外部サービスのプラットフォームのユーザーによって閲覧可能になる場合があります。当社がそのようなリンクを掲載することは、サービス上で開示されている場合を除き、それ自体が、そのようなプラットフォーム上のコンテンツまたはその所有者や運営者を推奨することを意味するものではありません。
                  </p>
                </div>

                {/* 子どものデータ */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">子どものデータ</h2>
                  <p className="text-gray-700 leading-relaxed">
                    本サービスは子供による使用を意図したものではなく、当社は子供に関する個人情報を故意に収集することはありません。当社に個人情報を提供したお子様の親または保護者の方は、下記の連絡先までご連絡いただき、個人情報の削除を依頼することができます。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    本プライバシーポリシーの発効日現在、当社は 16 歳未満の個人の個人情報を「共有」または「販売」
                    (これらの用語は適用法で定義されています) していることを実際に認識していません。
                  </p>
                </div>

                {/* 情報のセキュリティと保持 */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">情報のセキュリティと保持</h2>
                  <p className="text-gray-700 leading-relaxed">
                    いかなるセキュリティ対策も完璧または侵入不可能なものではなく、「完璧なセキュリティ」を保証することはできませんのでご了承ください。さらに、お客様が当社に送信する情報は、送信中に安全でない可能性があります。機密情報や秘密情報を当社に送信する際には、安全でないチャネルを使用しないことをお勧めします。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    当社がお客様の個人情報を保持する期間は、お客様のアカウントの維持、サービスの提供、法的義務の遵守、紛争の解決、その他の適用される契約やポリシーの施行に情報が必要かどうかなど、さまざまな要因によって異なります。
                  </p>
                </div>

                {/* あなたの権利 */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">あなたの権利</h2>
                  <p className="text-gray-700 leading-relaxed">
                    お住まいの地域に���じて、個人情報に関して以下に記載されている権利の一部または全部を有する場合があります。ただし、これらの権利は絶対的なものではなく、特定の状況にのみ適用される場合があり、場合によっては法律で許可されている範囲でお客様のリクエストを拒否することがあります。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>
                      <strong>アクセス権 / 知る権利：</strong>お客様には、当社がお客様に関して保有する個人情報
                      (当社がお客様の情報を使用および共有する方法に関する詳細を含む)
                      へのアクセスを要求する権利がある場合があります。
                    </li>
                    <li>
                      <strong>削除する権利：</strong>
                      お客様には、当社がお客様に関して保持している個人情報を削除するよう要求する権利がある場合があります。
                    </li>
                    <li>
                      <strong>訂正する権利：</strong>
                      お客様には、当社がお客様に関して保持している不正確な個人情報を訂正するよう要求する権利がある場合があります。
                    </li>
                    <li>
                      <strong>ポータビリティの権利：</strong>
                      一定の状況下および一定の例外のもと、お客様には当社が保有するお客様の個人情報のコピーを受け取る権利、および当社がその情報を外部サービスに転送することを要求する権利がある場合があります。
                    </li>
                    <li>
                      <strong>処理の制限：</strong>
                      お客様には、当社による個人情報の処理を停止または制限するよう要求する権利がある場合があります。
                    </li>
                    <li>
                      <strong>同意の撤回：</strong>
                      当社がお客様の個人情報を処理するために同意を必要とする場合、お客様にはこの同意を撤回する権利がある場合があります。
                    </li>
                    <li>
                      <strong>訴える：</strong>
                      当社がお客様のリクエストの処理を拒否した場合、お客様には当社の決定に対して異議を申し立てる権利がある場合があります。当社の拒否に直接返信することでそうすることができます。
                    </li>
                    <li>
                      <strong>コミュニケーション設定の管理：</strong>
                      当社はお客様にプロモーションメールを送信することがあります。お客様は、当社からのメール内に表示される配信停止オプションを使用して、いつでもこれらのメールの受信を停止することができます。オプトアウトした場合でも、アカウントや注文に関するものなど、プロモーション以外のメールは送信されることがあります。
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    これらの権利は、当サイトに記載されている場合、または下記の連絡先を使用して当社に連絡することにより行使できます。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、お客様がこれらの権利を行使したことを理由に差別することはありません。リクエストに対して実質的な回答を提供する前に、お客様の身元を確認するために、電子メール
                    アドレスやアカウント情報などの情報を収集する必要がある場合があります。適用法に従い、お客様は、お客様の権利を行使するためにお客様に代わってリクエストを行う権限のある代理人を指定することができます。代理人からのそのようなリクエストを受け入れる前に、当社は代理人に対し、お客様に代わって行動することをお客様が承認したことを証明する書類の提出を求めます。また、当社に対して直接お客様の身元を確認していただく必要がある場合もあります。当社は、適用法の規定に従い、お客様のご要望に適時対応いたします。
                  </p>
                </div>

                {/* 苦情 */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">苦情</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社によるお客様の個人情報の取り扱いに関して苦情がある場合は、下記の連絡先までご連絡ください。苦情に対する当社の対応にご満足いただけない場合、お住まいの地域によっては、下記の連絡先までご連絡いただくか、お住まいの地域のデータ保護当局に苦情を申し立てて、当社の決定に異議を申し立てる権利がある場合があります。確認できます。
                  </p>
                </div>

                {/* 海外ユーザー */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">海外ユーザー</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、お客様の個人情報をお客様の居住国外に転送、保管、処理する場合がありますのでご了承ください。お客様の個人情報は、これらの国のスタッフ、外部サービスのサービスプロバイダー、パートナーによっても処理されます。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    当社がお客様の個人情報をヨーロッパ外に転送する場合、適切なレベルの保護を提供すると判断された国へのデータ転送でない限り、当社は、欧州委員会の標準契約条項などの公認の転送メカニズム、または英国の関連管轄当局が発行した同等の契約に従います。
                  </p>
                </div>

                {/* 連絡先 */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900">連絡先</h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社のプライバシー慣行や本プライバシーポリシーについてご質問がある場合、またはお客様が利用できる権利を行使したい場合は、
                    <a href="mailto:info@hotone.jp" className="text-blue-600 hover:underline ml-1">
                      info@hotone.jp
                    </a>
                    にお電話またはメールをいただくか、あるいは湯島2-2-4 , JP-BASE御茶ノ水 9F, 文京区, JP-13, 113-0034,
                    JPまでお問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BlogSlider />
      </main>
    </div>
  )
}

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal'
import TOSModal from '@/components/TOSModal'

export default function AppInfo() {

    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
    const [showTOS, setShowTOS] = useState(false)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>App Information</CardTitle>
                    <CardDescription>Details about the Personal Banking App</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">App Name:</span>
                            <span>Personal Banking App</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Version:</span>
                            <span>1.0.0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Last Updated:</span>
                            <span>April 19, 2023</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Developer:</span>
                            <span>FinTech Solutions Inc.</span>
                        </div>
                        <div className="flex justify-between  items-center">
                            <span className="font-semibold">Contact Email:</span>
                            <span>support@personalbankingapp.com</span>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2">About</h4>
                            <p className="text-sm text-gray-600">
                                The Personal Banking App is a secure and user-friendly platform designed to help you manage your finances with ease.
                                Our app provides real-time account information, easy fund transfers, bill payments, and personalized financial insights
                                to help you make informed decisions about your money.
                            </p>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2">Privacy Policy</h4>
                            <p className="text-sm text-gray-600">
                                We are committed to protecting your privacy and ensuring the security of your personal and financial information.
                                To learn more about how we collect, use, and safeguard your data, please read our full Privacy Policy.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setShowPrivacyPolicy(true)}>Read Privacy Policy</Button>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-2">Terms of Service</h4>
                            <p className="text-sm text-gray-600">
                                By using the Personal Banking App, you agree to our Terms of Service. These terms outline the rules and regulations
                                for the use of our app and the services we provide.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setShowTOS(true)}>Read Terms of Service</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <PrivacyPolicyModal 
                show={showPrivacyPolicy} 
                onClose={() => setShowPrivacyPolicy(false)} 
            />

            <TOSModal
                show={showTOS} 
                onClose={() => setShowTOS(false)} 
            />
        </div>
    )
}
